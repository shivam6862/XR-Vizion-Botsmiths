# Import necessary libraries
import os
import sys, time
sys.path.append(os.getcwd())
from backendLLM.agent import *
# Define the upload folder
UPLOAD_FOLDER = 'uploads'
# Add the current directory to the system path
# sys.path.append(os.getcwd())


class Models:
    def __init__(self):
        self.user_conversationId_map = {}
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        print("Model created!")

    def model(self,data ,conversationId, history = {'title' : '' , 'chat_summary' : 'new chat begins'}):
        history = {'title' : '' , 'chat_summary' : 'new chat begins'}
        print(data , conversationId , history)
        if conversationId in self.user_conversationId_map:
            agent = self.user_conversationId_map[conversationId]
        else :
            print('***' ,type(conversationId) , conversationId)
            print('inside model' , history)
            agent = PersonalAgent(history=history, enable_cache=False)
            print('&&&&&&&')
            self.user_conversationId_map[conversationId] = agent
        start = time.time()
        print(100)
        answer = agent.run(data)
        print(200)
        new_history = agent.get_chat_summary()
        print(300)
        time_taken = time.time() - start
        query_cost = agent.query_cost
        return answer, new_history , time_taken, query_cost
