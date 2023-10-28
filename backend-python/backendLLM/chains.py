from langchain.chains import LLMChain
from backendLLM.prompts import *
from backendLLM.utils import *


# QA ConversationChain

summary_chain = LLMChain(llm=llm, prompt=summary_prompt)

chat_format_chain = LLMChain(llm=llm, prompt=chat_format_prompt)

title_chain = LLMChain(llm=llm, prompt=title_prompt)