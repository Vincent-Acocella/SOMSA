import flask
app = flask.Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False


# define a predict function as an endpoint 
@app.route("/predict", methods=["GET","POST"])
def predict():
    data = {"success": False}

    # get the request parameters
    params = flask.request.json
    if (params == None):
        params = flask.request.args

    # if parameters are found, echo the msg parameter 
    if (params != None):
        data["response"] = params.get("msg")
        data["success"] = True

    # return a response in json format 
    return flask.jsonify(data)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')