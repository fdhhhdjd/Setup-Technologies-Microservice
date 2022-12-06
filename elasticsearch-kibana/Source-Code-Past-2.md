***** Elasticsearch-Kibana (Past 2) ****
# Quey Code 
Click Devtool

# Watch info elasticsearch in kibana
GET /


# Mapping  ( Anh xa trong Db )
 GET facebook/_mapping

# Add mapping type 
 PUT facebook/_mapping
 {
   "properties":{
     "number":{
       "type":"integer"
     }
   }
 }

# Create data if exit _id notification error
PUT facebook/_create/10002
{
  "user": "Nam Bem",
  "uid": 1002,
  "team": "PSG",
  "age": 22
}

# Add index/_doc/_id( Not Auto )
PUT facebook/_doc/10001 or edit if field exit change version === 2  and result === update
{
  "user": "Tai Heo",
  "uid": 1001,
  "team": "Brazil",
  "age": 21
}

# Add data === Create
PUT facebook/_doc/10003?op_type=create
{
  "user": "Thinh Bem",
  "uid": 1003,
  "team": "Mancherter",
  "age": 21
}

# Add data  auto create random _id same mongoDb
POST facebook/_doc
{
  "user": "Bao Bem",
  "uid": 1004,
  "team": "Mancherter city",
  "age": 20
}

# Get _Id detail
GET facebook/_doc/10001

# Get _Id detail find data necessary (can thiet)
GET facebook/_doc/10001?_source=user,age

# Find multiple data and Take data any 
GET _mget
{
  "docs": [
    {
      "_index": "facebook",
      "_id": "10001",
      "_source": [
        "user",
        "team"
      ]
    },
    {
      "_index": "facebook",
      "_id": "10002",
      "_source": [
        "age",
        "uid"
      ]
    }
  ]
}

# Check Exit _id in index
HEAD facebook/_doc/10001

# Check index( Chi muc ) in trong db
HEAD facebook

# Delete index( Chi muc ) in trong db
HEAD facebook

# Delete Data
DELETE facebook/_doc/10003

# Delete Query ( Delete field age in db if exit delete all fields age===20 )
POST facebook/_delete_by_query
{
  "query": {
    "match": {
      "age": 20
    }
  }
}

# Total Count index( Chi muc ) in trong db
GET facebook/_count






