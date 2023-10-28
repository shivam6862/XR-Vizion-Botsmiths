from backendLLM.dataReading import *
from backendLLM.db_creation import *
from backendLLM.agent import *

paths = ['backendLLM/3_ER_Model.pdf']
import os
print(os.path.exists('backendLLM/3_ER_Model.pdf') , '\n\n\n\n')
ram = GetDataBase('backendLLM/info_db' , paths , enrich_metadata=False)
ram.add_data()



# shyam = PersonalAgent(history = {'title' : 'dbms queries' , 'chat_summary' : 'new chat begins'} , cache_path='backendLLM/cache' , enable_cache=False)
# print('hare krishna')
# x = shyam.run('tell me about methods and materials used')
# print(x)
# y = shyam.get_chat_summary()
# print('\n\n\n\n' , y)



