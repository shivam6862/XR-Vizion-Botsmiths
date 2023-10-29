import yaml
from langchain.llms import OpenAI
import openai
import os
from chromadb.api.types import Documents, Embeddings
from langchain.embeddings import OpenAIEmbeddings


from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv()) # read local .env file


llm = OpenAI(temperature=0, openai_api_key=os.environ['OPENAI_API_KEY'])

embedder = OpenAIEmbeddings(model='text-embedding-ada-002')

#_________________________________________________________________________________________

def load_config(CONFIG_PATH):
    with open(CONFIG_PATH, 'r') as f:
        config = yaml.safe_load(f)
    return config 
