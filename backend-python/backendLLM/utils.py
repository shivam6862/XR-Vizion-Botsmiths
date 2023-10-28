import yaml
from langchain.llms import GooglePalm
import google.generativeai as palm
import os
from chromadb.api.types import Documents, Embeddings

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv()) # read local .env file


llm = GooglePalm(temperature=0.2)
# llm.bind
palm.configure(api_key=os.environ['GOOGLE_API_KEY_PALM'])


models = [m for m in palm.list_models() if 'embedText' in m.supported_generation_methods]
model = models[0]

#_________________________________________________________________________________________
class Embedding:
  def __init__(self):
    self.embedder = palm


  def embed_documents(self, texts: Documents) -> Embeddings:
    # Embed the documents using any supported method
    return  [self.embedder.generate_embeddings(model=model, text=text)['embedding']
            for text in texts]

  def embed_query(self,query):
    return  self.embedder.generate_embeddings(model=model, text=query)['embedding']
  
#_________________________________________________________________________________________
def load_config(CONFIG_PATH):
    with open(CONFIG_PATH, 'r') as f:
        config = yaml.safe_load(f)
    return config 
