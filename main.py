import sqlite3 as sql
from flask import Flask, send_from_directory, jsonify
from flask_restful import Api
from flask_cors import CORS


app = Flask('__main__', static_url_path='', static_folder='ui/dist')
CORS(app)
api = Api(app)


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.get('/all/products')
def get_all_products():
    connect = sql.connect('supermarket.db')
    cursor = connect.cursor()
    res = cursor.execute("SELECT * FROM Products;")
    data = map(lambda x: {'id': x[0], 'name': x[1],
               'category': x[2], 'price': x[3]}, res)

    return jsonify(list(data))


@app.get('/all/stores')
def get_all_stores():
    connect = sql.connect('supermarket.db')
    cursor = connect.cursor()
    res = cursor.execute(
        "SELECT City, Count(Branch) FROM Stores GROUP BY City;")
    data = map(lambda x: {'city': x[0], 'branch_count': x[1]}, res)

    return jsonify(list(data))


@app.route('/about')
def about():
    return 'This is a flask app!!'


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3001, debug=True)
