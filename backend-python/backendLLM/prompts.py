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
chat_summary_template = """Progressively summarize the lines of conversation provided, adding onto the previous summary returning a new summary.
Make sure to use the previous summary as context for the new summary and make sure that the new summary is a continuation of the previous summary, 
not white washing previous information. Keep summary to a maximum of 100 words. Don't waste words in using lot of stop words, be precise.

EXAMPLE
Current summary:
The human asks what the AI thinks of artificial intelligence. The AI thinks artificial intelligence is a force for good.

New lines of conversation:
Human: Why do you think artificial intelligence is a force for good?
AI: Because artificial intelligence will help humans reach their full potential.

New summary:
The human asks what the AI thinks of artificial intelligence. The AI thinks artificial intelligence is a force for good because it will help humans reach their full potential.
END OF EXAMPLE

Current summary:
{summary}

New lines of conversation:
{new_lines}

New summary:"""

chat_summary_prompt = PromptTemplate(
    input_variables=["summary", "new_lines"],
    template=chat_summary_template,
)

#_______________________________________________________________________________________________________________________

title_template= ''''
Write a descriptive title of the following text in not more than 30 words:

Text: {text}
'''

title_prompt = PromptTemplate(
    input_variables=["text"],
    template=title_template,
)