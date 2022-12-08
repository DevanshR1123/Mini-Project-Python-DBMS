from flask_restful import Resource, reqparse
import sqlite3 as sql

connect = sql.connect('supermarket.db')
cursor = connect.cursor()


class all(Resource):
    def get(self):
        pass

    def post(self):
        pass


class add(Resource):
    def get(self):
        pass

    def post(self):
        pass
