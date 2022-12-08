from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS, logging


app = Flask('__main__', static_url_path='', static_folder='build')
CORS(app)
api = Api(app)

logging.getLogger('flask_cors').level = logging.DEBUG


@app.route('/')
def index():
    return "Hello"  # send_from_directory(app.static_folder, 'index.html')


@app.route('/about')
def about():
    return 'This is a flask app!!'


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3001, debug=True)
