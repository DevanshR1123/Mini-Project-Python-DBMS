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
                        'cust_id': x[0], 'first_name': x[1], 'last_name': x[2], 'gender': x[3]}, data)
    return jsonify(list(dict_data))


@app.get('/all/invoices')
def get_all_invoices():
    with sql.connect('supermarket.db') as connect:
        cursor = connect.cursor()
        res = cursor.execute('''SELECT Invoice_ID.Purchases,
        Customers.First_name,
        Customers.Last_name,
        Stores.Branch,
        Stores.City,
        Stores.ID,
        Purchases.Prod_ID,
        Purchases.Quantity,
        Purchases,Total_Amount
        FROM Purchases,Stores,City,Customers
        WHERE Purchases.Prod_ID=Products.ID
        AND Purchases.Store_ID=Stores.ID
        AND Purchases.Cust_ID=Customers.ID
        ''')
        data = map(lambda x: {'city': x[0], 'branch_count': x[1]}, res)
    return jsonify(data)


@app.get('/stock')
def get_stock():
    with sql.connect('supermarket.db') as connect:
        cur = connect.cursor()
        data = cur.execute('''
            SELECT
                Products.Name,
                Stores.City,
                Stores.Branch,
                Stock.Quantity
            FROM
                Stock,
                Products,
                Stores
            WHERE
                Stock.Prod_ID = Products.ID
                AND Stock.Store_ID = Stores.ID
            ORDER BY
                Products.ID ;''')
        dict_data = map(
            lambda x: {'prod_name': x[0], 'store_city': x[1], 'branch': x[2], 'stock': x[3]}, data)
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
