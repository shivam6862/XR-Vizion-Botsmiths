# Import necessary libraries
import os
import sys
sys.path.append(os.getcwd())
from backendLLM.agent import *
# Define the upload folder
UPLOAD_FOLDER = 'uploads'
# Add the current directory to the system path
sys.path.append(os.getcwd())


class Models:
    def __init__(self):
        self.user_conversationId_map = {}
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        print("Model created!")

    def model(self,data ,conversationId, history = None):
        print(data , conversationId , history)
        if conversationId in self.user_conversationId_map:
            agent = self.user_conversationId_map[conversationId]
        else :
            agent = PersonalAgent(None, enable_cache=False)
            self.user_conversationId_map[conversationId] = agent
        answer = agent.run(data)
        new_history = agent.get_chat_summary()
        return answer, new_history
