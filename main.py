import json
import sqlite3 as sql
from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS


app = Flask('__main__', static_url_path='', static_folder='ui/dist')
CORS(app)


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
        res = cursor.execute('''
            SELECT
                Purchases.Invoice_ID,
                Customers.First_name,
                Customers.Last_name,
                Products.Name,
                Purchases.Quantity,
                Stores.City,
                Stores.Branch,
                Total_Amount
            FROM
                Purchases,
                Stores,
                Customers,
                Products
            WHERE
                Purchases.Prod_ID = Products.ID
                AND Purchases.Store_ID = Stores.ID
                AND Purchases.Cust_ID = Customers.ID;
        ''')
        data = map(lambda x: {
                   'id': x[0],
                   'cust_name': x[1] + ' ' + x[2],
                   'prod_name': x[3],
                   'quantity': x[4],
                   'store_city': x[5],
                   'branch': x[6],
                   'total_amount': x[7]
                   }, res)
    return jsonify(list(data))


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
                Products.ID;
                ''')
        dict_data = map(
            lambda x: {'prod_name': x[0], 'store_city': x[1], 'branch': x[2], 'stock': x[3]}, data)
    return jsonify(list(dict_data))


@app.post('/customer/<int:cust_id>')
def customer(cust_id):
    body = json.loads(request.data.decode('utf-8'))
    with sql.connect('supermarket.db') as connect:
        cursor = connect.cursor()
        res = cursor.execute(
            "SELECT * FROM Customers WHERE ID = :id;",
            {'id': cust_id})

        res_list = list(res)

        if len(res_list) == 0:
            cursor.execute('''
                    INSERT INTO
                        Customers(ID, First_name, Last_Name, Gender)
                    VALUES
                        (:id, :first_name, :last_name, :gender)
                           ''', body['customer'])
            print('inserted', body['customer'])

        cust_name = list(cursor.execute(
            "SELECT First_name, Last_name FROM Customers WHERE ID = :id;",
            {'id': cust_id}))[0]

        store = list(cursor.execute('SELECT ID FROM Stores WHERE City = :city AND Branch = :branch;',
                                    {'city': body['customer']['city'],
                                     'branch': body['customer']['branch']}))[0][0]

        print(store)

        purchased = []

        for prod_id, qty in body['products'].items():
            prod_name, price = list(cursor.execute('''
                SELECT Name, UnitPrice
                FROM Products
                WHERE ID = :id;
            ''', {'id': prod_id}))[0]

            stock = list(cursor.execute('''
                SELECT Quantity FROM Stock WHERE Prod_ID = :prod_id AND Store_ID = :store_id;
            ''', {'prod_id': prod_id,
                  'store_id': store}))

            if (len(stock) != 0 and stock[0][0] >= qty):
                cursor.execute('''
                    UPDATE STOCK SET Quantity = :stock - :qty WHERE Prod_ID = :prod_id AND Store_ID = :store_id;
                    
                       ''', {'stock': stock[0][0], 'qty': qty, 'prod_id': prod_id,
                             'store_id': store})

                cursor.execute('''
                    INSERT INTO
                        Purchases(Prod_ID, Store_ID, Cust_ID, Quantity, Total_Amount)
                    VALUES
                        (:prod_id,:store_id, :cust_id, :qty, :total_amount)
                           ''', {
                    'prod_id': prod_id,
                    'store_id': store,
                    'qty': qty,
                    'cust_id': cust_id,
                    'total_amount': price*qty})

                purchased.append({'name': prod_name,
                                  'qty': qty,
                                  'total_amount': price*qty})

    return jsonify({
        'cust_name': ' '.join(cust_name),
        'purchases': purchased
    })


@app.post('/purchase')
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
