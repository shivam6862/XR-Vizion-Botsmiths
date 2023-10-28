from langchain.vectorstores import chroma
from dataReading import *
from utils import Embedding
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainFilter

class GetDataBase:
  def __init__(self , db_path , file_paths , enrich_metadata=False):
    self.db_path = db_path
    self.file_paths = file_paths
    self.enrich_metadata = enrich_metadata
    self.filter_ = LLMChainFilter.from_llm(llm)
    self.db = chroma.Chroma(embedding_function=Embedding() , persist_directory=db_path)

  def add_data(self):
    data = DataReading(self.file_paths)
    docs:List[Document] = data.read_all()
    splitter = DataSplitting(docs , enrich_metadata=self.enrich_metadata)

    pages:List[Document] = splitter.split()
    self.idxs = [i for i in range(len(pages))]
    self.db.add_documents(pages, id = self.idxs)
    return
  
  def delete_db(self):
    self.db.delete(self.idxs)

  def run(self , query):
    retriever = self.db.as_retriever(search_kwargs={"k": 4, 'fetch_k': 20}, return_source_documents=True)
    compression_retriever = ContextualCompressionRetriever(base_compressor= self.filter_, base_retriever=retriever)
    return compression_retriever.get_relevant_documents(query)
  


    


    