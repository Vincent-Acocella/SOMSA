"""Using the Model"""


import json
import numpy as np
import keras
import os
import sys
import keras.preprocessing.text as kpt
from keras.preprocessing.text import Tokenizer
from keras.models import model_from_json
from flask import request
from flask import jsonify
import flask
from flask_cors import CORS
app = flask.Flask(__name__)
#cors =
CORS(app)

@app.route("/predict", methods=["GET","POST"])
def predict():
    JSONdata = request.get_json()
    #JSONdata = request.data
    #JSONdata = json.loads(JSONdata)
    # Utilizing Tokenizer

    tokenizer = Tokenizer(num_words = 3000)

    # Labels for Printing
    labels = ['Negative', 'Positive']

    # Accessing our Dictionary
    with open(os.path.join(sys.path[0], 'dictionary.json'), 'r') as dictionary_file:
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

    def doPrediction(data_dict):
        data = {}
        for json in data_dict:
          for key in json:
            #print(key)
            comment_string = json[key][0]
            #print(comment_string)
            topic_category = json[key][1]
            a = convert_text_to_index_array(comment_string)
            a = tokenizer.sequences_to_matrix([a], mode = 'binary')
            prediction = model.predict(a)
            #print(prediction)
            data[key] = [comment_string, topic_category, labels[np.argmax(prediction)], prediction[0][np.argmax(prediction)] * 100]
        return data

    ''''
    # Read our Saved Model Structure
    json_file = open('model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()

    # Creating Model from that Model
    model = model_from_json(loaded_model_json)
    # Adding Weight to the Nodes
    model.load_weights('model.h5')
    '''

    #model = open('/content/saved_model/saved_model.pb')
    model = keras.models.load_model(os.path.join(sys.path[0],'saved_data'))
    #model.summary()
    # The file that contains the data we want to feed to the analyzer
    # The JSON is organized to have the topic title as the key to a table that contains
    # the data collected and the category they fall under
    # data_ini = json.load(JSONdata)
    data_fin = {}


    # Iterate the data we received, produce a sentiment for each
    temp = doPrediction(JSONdata)
    for key in temp:
      data_fin[key] = temp[key]


#    data_in = open('/data_in_reddit.json')
#    data_ini = json.load(data_in)
#    temp = doPrediction(data_ini)
#    for key in temp:
#      data_fin[key] = temp[key]
#
#    data_in = open('/data_in_twitter.json')
#    data_ini = json.load(data_in)
#    temp = doPrediction(data_ini)
#    for key in temp:
#      data_fin[key] = temp[key]

    for key in data_fin:
      print(key)
      print(data_fin[key][2])

    # Create a json file that will contain the the topic title as a key to a table that contains
    # The original data collected, the category they fall under, the sentiment, and the confidence interval
    # Change 'w' (create if does not exist) to 'x' (create file, throw error if it exists)?
    return jsonify(data_fin)
 
app.run(host='0.0.0.0000', port=8000)
