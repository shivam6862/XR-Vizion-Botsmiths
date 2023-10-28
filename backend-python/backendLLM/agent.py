from langchain.agents import ZeroShotAgent, Tool, AgentExecutor
from langchain.memory import ConversationSummaryBufferMemory
from langchain.tools import BaseTool
from langchain.agents import Tool
from typing import Optional, List
from langchain.callbacks.manager import (
    AsyncCallbackManagerForToolRun,
    CallbackManagerForToolRun,
)
from langchain.schema import Document
from langchain.utilities.google_search import GoogleSearchAPIWrapper
from backendLLM.chains import *
from langchain.vectorstores import chroma
from queue import Queue 


db_path = 'backend-python/backendLLM/db'
db = chroma.Chroma(embedding_function=Embedding() , persist_directory=db_path)
#_______________________________________________________________________________________________________________________
class VectorDB(BaseTool):
    
    # return_direct = True
    # handle_tool_error = True
    def __init__(self,name, descr):
      super(VectorDB, self).__init__(name=name, description=descr, return_direct=True, handle_tool_error=True)

    def _run(
      self,
      query: str,
      run_manager: Optional[CallbackManagerForToolRun] = None,
    ) -> str:
      """Use the tool."""
      results:List[Document] = db.run(query)
      if 'summary' in query.lower() or 'summarize' in query.lower():
        return self.__formatting__(results , to_summarize=True)

      return self.__formatting__(results)
  
    def __formatting__(self, docs:List[Document] , to_summarize = False)->dict:
      result = {}
      text = ''
      meta_list = []
      for doc in docs:
        text += doc.page_content+'\n'
        meta_str = ''
        for key in doc.metadata:
          if not key == 'summary':
            meta_str += key + ' : ' + doc.metadata[key] + '\t\t'
            meta_list.append(meta_str)
      
      metadata = '\n'.join(meta_list)
      if to_summarize:
        result['text'] = summary_chain.run(text)
      else :
        result['text'] = chat_format_chain(text)
      result['metadata'] = metadata
      return result


search = GoogleSearchAPIWrapper()

#_______________________________________________________________________________________________________________________

class PersonalAgent:
  def __init__(self, history  , cache_path = 'backendLLM/cache' , enable_cache = False):

    self.history = history
    if history is None :
        self.history = {'title' : '' , 'chat_summary' : ''}
    self.prefix = """Have a conversation with a human, answering the following questions as best you can. You have access to the following tools:"""
    self.suffix = """Begin!

    Chat History:
    {chat_history}

    Question: 
    {input}

    Scratchpad:
    {agent_scratchpad}
    """

    # tools
    self.task_tools = [
        VectorDB(name = "User Database", 
                descr = '''
                    Use this tool to fetch answer to user queries from database. Prioritize this over web search.
              '''),
        Tool(
        name="Google Search",  
        description="Use when the user wants to search something on web instead of relying on database.", 
        func=search.run,  
        return_direct=False, 
        handle_tool_error=True,  
        ),
]

    self.task_prompt = ZeroShotAgent.create_prompt(
        self.task_tools,
        prefix=self.prefix,
        suffix=self.suffix,
        input_variables=["input", "chat_history", "agent_scratchpad"],
    )

    # memory
    self.memory = ConversationSummaryBufferMemory(llm = llm ,memory_key="chat_history", 
                                                  moving_summary_buffer = self.history['chat_summary'])

    self.llm_chain = LLMChain(llm=llm, prompt=self.task_prompt)
    
    # agent
    self.agent = ZeroShotAgent(llm_chain=self.llm_chain, tools=self.task_tools, verbose=True)
    self.agent_chain = AgentExecutor.from_agent_and_tools(
        agent=self.agent, tools=self.task_tools, 
        verbose=True, memory=self.memory, handle_parsing_errors=True,
    )

    # caching
    self.enable_cache = enable_cache  
    self.cache = chroma.Chroma(embedding_function=Embedding() , persist_directory=cache_path)
    self.cache_size = 0
    self.prev_queries = Queue(maxsize = 3) 
    self.cache.add_documents([Document(page_content='' , metadata={'summary':''})], id=[self.cache_size])

  def run(self, query):
    
       
    if self.enable_cache:
      if self.prev_queries.full():
        self.prev_queries.get()
      self.prev_queries.put(query)

      self.query_window = '\n'.join(iter(self.prev_queries.queue))
      cache, score = self.cache.similarity_search_with_relevance_scores(query = self.query_window , k = 2).sort(key=lambda x: x[1])[0]
      if score<0.3:
          return cache.page_content
    try:
        ans =  self.agent_chain.run(query)
        if self.enable_cache:
          self.cache_size += 1
          self.cache.add_documents([Document(page_content=ans , metadata={'window' :self.query_window})], id=[self.cache_size])
        return ans
    except Exception as e:
        print('Jai Shree Ram!! Inside agent')
    return "I did not get that. Please try again."

  def get_chat_summary(self):
    messages = self.memory.chat_memory.messages
    self.history['chat_summary'] = self.memory.predict_new_summary(messages, self.history['chat_summary'])
    if self.history['title'] == '':
        self.history['title'] = title_chain.run(self.history['chat_summary'])
    
    return self.history
  
  def delete_cache(self):
    self.cache.delete([i for i in range(self.cache_size+1)])
    self.cache_size = 0
    return
  