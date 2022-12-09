import sqlite3 as sql
from flask import Flask, send_from_directory, jsonify, request
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
    with sql.connect('supermarket.db') as connect:
        cursor = connect.cursor()
        res = cursor.execute("SELECT * FROM Products;")
        data = map(lambda x: {'id': x[0], 'name': x[1],
                              'category': x[2], 'price': x[3]}, res)

    return jsonify(list(data))


@app.get('/all/stores')
def get_all_stores():
    with sql.connect('supermarket.db') as connect:
        cursor = connect.cursor()
        res = cursor.execute(
            "SELECT City, Count(Branch) FROM Stores GROUP BY City;")
        data = map(lambda x: {'city': x[0], 'branch_count': x[1]}, res)

    return jsonify(list(data))


@app.get('/all/customers')
def get_all_customers():
    with sql.connect('supermarket.db') as connect:
        cur = connect.cursor()
        data = cur.execute("SELECT * FROM Customers")
        dict_data = map(lambda x: {
                        'CUSTOMER_ID': x[0], 'FIRST_NAME': x[1], 'LAST_NAME': x[2], 'GENDER': x[3]}, data)
    return jsonify(list(dict_data))


@app.get('/all/invoices')
def get_all_invoices():
    with sql.connect('supermarket.db') as connect:
        cursor = connect.cursor()
        res = cursor.execute()
        data = map(lambda x: {'city': x[0], 'branch_count': x[1]}, res)


@app.get('/stock')
def get_stock():
    with sql.connect('supermarket.db') as connect:
        cur = connect.cursor()
        data = cur.execute("SELECT * FROM Stock")
        dict_data = map(
            lambda x: {'PRODUCT_ID': x[0], 'STORE_ID': x[1], 'AVAIABLE_STOCK': x[2]}, data)
    return jsonify(list(dict_data))


@app.get('/purchase')
def purchase():
    pass


@app.post('/query')
def query():
    with sql.connect('supermarket.db') as connect:
        cursor = connect.cursor()
        query_str = request.data.decode('utf-8')
        print(query_str)
        res = cursor.execute(query_str)
    return jsonify(list(res))


@app.route('/about')
def about():
    return 'This is a flask app!!'


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3001, debug=True)
