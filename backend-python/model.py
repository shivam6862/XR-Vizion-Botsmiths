# Import necessary libraries
import os
import sys

# Define the upload folder
UPLOAD_FOLDER = 'uploads'
# Add the current directory to the system path
sys.path.append(os.getcwd())


class Models:
    def __init__(self):
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        print("Model created!")

    def model(self, data):
        return data
