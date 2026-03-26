from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/Face-Find")
db = client["Face-Find"]
users_collection = db["users"]

