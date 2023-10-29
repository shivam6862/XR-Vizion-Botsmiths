from backendLLM.dataReading import *
from backendLLM.db_creation import *
from backendLLM.agent import *
import os

dir_path = 'backendLLM/uploads'
file_paths = []

for root, _, files in os.walk(dir_path):
    for file in files:
        file_paths.append(os.path.join(root, file))

ram = GetDataBase('backendLLM/info_db' , file_paths , enrich_metadata=False)
ram.add_data()