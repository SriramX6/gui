from flask import Flask , request ,jsonify
from flask_cors import CORS
from pymongo import MongoClient


client =  MongoClient(f'mongodb://localhost:27017/', maxPoolSize=10)
db = None

app = Flask(__name__)
cors  = CORS(app , origin = "*")

# @app.route("/api/users" , methods = ['GET'])
# def users():
#     return jsonify(
#         {
#             "users" : [
#                 "a" ,
#                 "s" ,
#                 "d"
#             ]
#         }
#     )


# print(Dblist)
@app.route("/api/dbList" , methods = ['GET'])
def dblist():
   Db = client.list_database_names()
   Dblist = []
   for db in Db:
         Dblist.append(db)
   return jsonify(Dblist)

# /

# @app.route("/api/collectionList" , methods = ['GET'])
# def collection():
#    collec = client.list_collection_names()
#    colList = []
#    for i in collec:
#          colList.append(i)
#    return jsonify(colList)


# /
@app.route('/api/db', methods=['POST'])
def submit_form():
    data = request.json  # Assuming frontend sends json data
    database_entry = data.get('DBname')
    collection_name = data.get('collectionName')

    new_database = database_entry
    print("received data: " ,  database_entry)
    if new_database:
        
            # client = MongoClient(f'mongodb://localhost:27017/', maxPoolSize=10)
            db = client[new_database]  # Try to create the database
            # database_combobox['values'] = client.list_database_names()
            # database_combobox.set(new_database)

            db.create_collection(collection_name)

    # Process the data as needed
    return {'message': 'Data received successfully'}





if __name__ == "__main__" :
    app.run(debug = True , port = 8080)