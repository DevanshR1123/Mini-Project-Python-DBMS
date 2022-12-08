from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS
from api_handlers import all, add


app = Flask('__main__', static_url_path='', static_folder='ui/dist')
CORS(app)
api = Api(app)


@app.route('/')
def index():
    return "Hello"  # send_from_directory(app.static_folder, 'index.html')


@app.route('/about')
def about():
    return 'This is a flask app!!'


api.add_resource(all, '/db')
api.add_resource(add, '/add')


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3001, debug=True)
