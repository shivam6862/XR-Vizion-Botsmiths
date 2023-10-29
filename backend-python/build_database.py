from backendLLM.dataReading import *
from backendLLM.db_creation import *
import os

dir_path = 'backendLLM/uploads'
file_paths = [
    'https://www.analyticsvidhya.com/blog/2023/07/prompt-engineering-for-llm-applications-with-langchain/',

]

for root, _, files in os.walk(dir_path):
    for file in files:
        file_paths.append(os.path.join(root, file))

# print(file_paths)
ram = GetDataBase('backendLLM/info_db' , file_paths , enrich_metadata=False)
ram.add_data()