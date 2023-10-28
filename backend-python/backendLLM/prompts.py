from langchain.prompts import PromptTemplate
from backendLLM.parsers import *


summary_template= ''''
Write a summary of the following text in bulleted points: 
Format Instructions:
{format_instructions}

Query : 
{query}

''' 
summary_prompt = PromptTemplate(
    input_variables=["query"],
    template=summary_template,
    partial_variables={"format_instructions": summary_parser.get_format_instructions()}
)


#_______________________________________________________________________________________________________________________


#_______________________________________________________________________________________________________________________

title_template= ''''
Write a descriptive title of the following text in not more than 30 words:

Text: {text}
'''

title_prompt = PromptTemplate(
    input_variables=["text"],
    template=title_template,
)