from dataReading import *
from db_creation import *
from agent import *

paths = ['backendLLM/3_ER_Model.pdf']
import os
print(os.path.exists('backendLLM/3_ER_Model.pdf') , '\n\n\n\n')
# ram = GetDataBase('backendLLM/db' , paths , enrich_metadata=False)
# ram.add_data()



shyam = PersonalAgent(None , 'backendLLM/cache' , enable_cache=True)
print('hare krishna')
x = shyam.run('tell me about methods and materials used')
print(x)
y = shyam.get_chat_summary()
print('\n\n\n\n' , y)



