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
from backendLLM.db_creation import *
from langchain.vectorstores import chroma
from queue import Queue 
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainFilter
import json
from langchain.callbacks import get_openai_callback


#_______________________________________________________________________________________________________________________
db_path = 'backendLLM/info_db'
db = chroma.Chroma(embedding_function=embedder , persist_directory=db_path)

# def run(self , query):
filter_ = LLMChainFilter.from_llm(llm)
retriever = db.as_retriever(search_kwargs={"k": 5, 'fetch_k': 10}, return_source_documents=True)
compression_retriever = ContextualCompressionRetriever(base_compressor= filter_, base_retriever=retriever)

#_______________________________________________________________________________________________________________________
class VectorDB(BaseTool):
    
    def __init__(self ,name, descr):
      super(VectorDB, self).__init__(name=name, description=descr, return_direct=True, handle_tool_error=True)

    def _run(
      self,
      query: str,
      run_manager: Optional[CallbackManagerForToolRun] = None,
    ) -> str:
      """Use the tool."""
      results:List[Document] =  compression_retriever.get_relevant_documents(query)
      if 'summary' in query.lower() or 'summarize' in query.lower():
        return self.__formatting__(results , to_summarize=True)

      result =  self.__formatting__(results)
      return result
  
    def __formatting__(self, docs:List[Document] , to_summarize = False)->dict:
      text = ''
      result = {}
      meta_list = []
      for doc in docs:

        text += doc.page_content +'\n'
        meta_str = ''
        for key in doc.metadata:
          if not key == 'summary':
            meta_str += key + ' : ' + (str)(doc.metadata[key]) + '\t\t'
            meta_list.append(meta_str)
      metadata = '\n'.join(meta_list)
      if to_summarize:
        result['text'] = summary_chain.run(text)
      else :
        result['text'] = chat_format_chain.run(text)
      result['metadata'] = metadata
      json_string = json.dumps(result)

      return json_string


search = GoogleSearchAPIWrapper()
# calculator = WolframAlphaAPIWrapper()
#_______________________________________________________________________________________________________________________

class PersonalAgent:
  def __init__(self, history, cache_path = 'backendLLM/cache' , enable_cache = False):

    self.history = history
    self.query_cost = 0
    self.prefix = """Have a conversation with a human, answering the following questions as best you can. 
                      Do not make your own facts when you fail to get answers from provided tools.You have access to the following tools:"""
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
          VectorDB(
            name = "User Database", 
            descr = '''Use this tool to fetch answer to user queries from database. Prioritize this over web search.'''),
          Tool(
            name="Google Search",  
            description="This tool is helpful for web search for all queries" , 
            func=search.run,  
            handle_tool_error=True,  
          ),
          # Tool(
          #   name="Calculator", 
          #   description="This tool is helpful for dealing with mathematical queries/problems.", 
          #   func=calculator.run, 
          #   handle_tool_error=True,
          # )
]
    self.task_prompt = ZeroShotAgent.create_prompt(
        self.task_tools,
        prefix=self.prefix,
        suffix=self.suffix,
        input_variables=["input", "chat_history", "agent_scratchpad"],
    )
    print(self.history)
    # memory
    self.memory = ConversationSummaryBufferMemory(llm = llm ,memory_key="chat_history" , prompt=chat_summary_prompt,
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
    self.cache = chroma.Chroma(embedding_function=embedder , persist_directory=cache_path)
    self.cache_size = 0
    self.prev_queries = Queue(maxsize = 3) 
    self.cache.add_documents([Document(page_content='Have a good day' , metadata={'summary':'Be grateful to GOD'})], id=[self.cache_size])

  def run(self, query):
    final_ans = ''
    self.query_cost = 0
    with get_openai_callback() as cb:

      if self.enable_cache:
        if self.prev_queries.full():
          self.prev_queries.get()
        self.prev_queries.put(query)

        self.query_window = '\n'.join(iter(self.prev_queries.queue))
        cache, score = self.cache.similarity_search_with_relevance_scores(query = self.query_window , k = 2).sort(key=lambda x: x[1])[0]
        
        if score>0.8:  # Return docs and relevance scores in the range [0, 1].  0 is dissimilar, 1 is most similar.
          final_ans = cache.page_content
      try:
        ans =  self.agent_chain.run(query)
      
        if self.enable_cache:
          self.cache_size += 1
          self.cache.add_documents([Document(page_content=ans , metadata={'window' :self.query_window})], id=[self.cache_size])
        final_ans =  ans
      except Exception as e:
        print('Exception: \n\n' ,e)
      final_ans =  "I did not get that. Please try again."
      self.query_cost = cb.total_cost
    return final_ans

  def get_chat_summary(self):
    with get_openai_callback() as cb:
      messages = self.memory.chat_memory.messages
      self.history['chat_summary'] = self.memory.predict_new_summary(messages, self.history['chat_summary'])
      if self.history['title'] == '':
        self.history['title'] = title_chain.run(self.history['chat_summary'])
      self.query_cost += cb.total_cost
    return self.history
  
  def delete_cache(self):
    self.cache.delete([i for i in range(self.cache_size+1)])
    self.cache_size = 0
    return
  