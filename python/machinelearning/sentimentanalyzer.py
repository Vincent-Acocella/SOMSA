import json
import numpy as np
import keras
import keras.preprocessing.text as kpt
from keras.preprocessing.text import Tokenizer
from keras.models import model_from_json

app = Flask(__name__)


@app.route("/", methods=["GET","POST"])
def sentimentAnal():

  # Utilizing Tokenizer
  tokenizer = Tokenizer(num_words = 3000)

  # Labels for Printing
  labels = ['Negative', 'Positive']

  # Accessing our Dictionary
  with open('dictionary.json', 'r') as dictionary_file:
    dictionary = json.load(dictionary_file)

  # Checking to Make Sure Words were in Training Corpus
  # Before Converting into a Matrix
  def convert_text_to_index_array(text):
    words = kpt.text_to_word_sequence(text)
    wordIndices = []
    for word in words:
      if word in dictionary:
        wordIndices.append(dictionary[word])
      else:
        pass
        #print("'%s' is not in the Training Corpus, Ignoring." %(word))
    return wordIndices

  # Read our Saved Model Structure
  json_file = open('model.json', 'r')
  loaded_model_json = json_file.read()
  json_file.close()

  # Creating Model from that Model
  model = model_from_json(loaded_model_json)
  # Adding Weight to the Nodes
  model.load_weights('model.h5')

  # THIS IS WHERE YOU INPUT THE FILE OR SENTENCE

  str = open('', 'r').read()
  # evalSentence = ('You are amazing')


  testArr = convert_text_to_index_array(str)#evalSentence)
  input = tokenizer.sequences_to_matrix([testArr], mode = 'binary')

      # Predict if Positive or Negative
  pred = model.predict(input)

  return (labels[np.argmax(pred)], pred[0][np.argmax(pred)] * 100)
  
  if __name == '__main__':
    app.run(host='127.0.0.1', port=8000)