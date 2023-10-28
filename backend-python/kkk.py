from backendLLM.chains import*

# print(chat_format_chain.run(' Story of sri Krishna and Arjuna : Krishna and Arjuna were cousins and best friends. They were also great warriors. Arjuna was the best archer in the world. Krishna was the best chario.'))



s ='''
  2. ER Model
1. It is a high level data model based on a perception of a real world that consists of a collection of basic objects, calledentities and of relationships        
 among these objects.
2. Graphical representation of ER Model is ER diagram, which acts as a blueprint of DB.
LEC-3: Entity-Relationship Model
1. Data Model: Collection of conceptual tools for describing data, data relationships, data semantics, and consistency
constraints.
2. ER Model
5. e.g., Customer borrow loan, loan has total participation as it can’t exist without customer entity. And
customer has partial participation.
6. Weak entity has total participation constraint, but strong
 may not have total.
8. ER Notations
CodeHelp

'''
import re
def insert_newline_after_50_words(text):
    # Regular expression to split text into words
    words = re.findall(r'\b\w+\b', text)
    # Insert newline character after every 50 words
    words_with_newline = [word + '\n' if (i + 1) % 10 == 0 else word for i, word in enumerate(words)]
    # Join the words back into a string
    result = ' '.join(words_with_newline)
    return result

# y = insert_newline_after_50_words(s)
# print(y, '\n\n\n')
def remove_numbering(text):
    # Regular expression to match numbering followed by newline
    pattern = r'\d+\.\s+(.*?)\n'
    # Use re.sub() to remove the matching pattern and keep the newline character
    result = re.sub(pattern, r'\1\n', text)
    return result

z = remove_numbering(s)
print(z)


x = chat_format_chain.run(z)
print(x)

