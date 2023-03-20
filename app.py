from __future__ import division, print_function
from flask_cors import CORS, cross_origin
# coding=utf-8
import sys
import os
import glob
import numpy as np

# Keras
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Flask utils
from flask import Flask, request, render_template
from werkzeug.utils import secure_filename

os.environ["CUDA_VISIBLE_DEVICES"]="-1"
# Define a flask app
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
# Model saved with Keras model.save()
MODEL_PATH = 'backend/models/modelres50.h5'

#Load your trained model
model = load_model(MODEL_PATH)
#model._make_predict_function()          # Necessary to make everything ready to run on the GPU ahead of time
print('Model loaded. Start serving...')



def model_predict(img_path, model):
    img = image.load_img(img_path, target_size=(200,200)) #target_size must agree with what the trained model expects!!

    # Preprocessing the image
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img.astype('float32')/255

    preds = model.predict(img)



    pred = np.argmax(preds,axis = 1)
    return pred


@app.route('/backend', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')

predictions = []
@app.route('/backend/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        pred = model_predict(file_path, model)
        os.remove(file_path)#removes file from the server after prediction has been returned

        # Arrange the correct return according to the model.
		# In this model 1 is Pneumonia and 0 is Normal.
        str0 = 'Glioma'
        str1 = 'Meningioma'
        str3 = 'Pituitary'
        str2 = 'No Tumour'
        if pred[0] == 0:
            predictions.append(str0)
            length = len(predictions) - 1
            return f"{predictions[length]}"
        elif pred[0] == 1:
            predictions.append(str1)
            length = len(predictions) - 1
            return f"{predictions[length]}"
        elif pred[0]==3:
            predictions.append(str3)
            length = len(predictions) - 1
            return f"{predictions[length]}"
        else:
            predictions.append(str2)
            length = len(predictions) - 1
            return f"{predictions[length]}"
    return None

    #this section is used by gunicorn to serve the app on Heroku
# if __name__ == '__main__':
#         app.run(debug=True, host="localhost", port=8080)
    #uncomment this section to serve the app locally with gevent at:  http://localhost:5000
    # Serve the app with gevent
    #http_server = WSGIServer(('', 5000), app)
    #http_server.serve_forever()
