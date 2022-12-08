# Create index (chi muc) 
PUT players 

# Create type index field
PUT players/_mapping
{
  "properties":{
    "birth_date":{
      "type":"date",
      "format":"dd/MM/yyyy"
    }
  }
}

# Add multiple fields if exit update
POST _bulk
{"index":{"_index":"players","_id":7}}
{"id":7,"name":"Nguyen Tien Tai","email":"nguyentientai10@gmail.com","gender":"male","ip":"192.168.0.1","birth_date":"31/05/2000","salary":9999999}
{"index":{"_index":"players","_id":8}}
{"id":8,"name":"Thai Van Nam","email":"thaivannam@gmail.com","gender":"male","ip":"192.168.0.2","birth_date":"10/01/2000","salary":77777}
{"index":{"_index":"players","_id":9}}
{"id":9,"name":"Nguyen Duy Thinh","email":"duythinh1610@gmail.com","gender":"male","ip":"192.168.0.3","birth_date":"12/09/2000","salary":775557}

# Get id so  just take source (Fields)
GET players/_doc/7?filter_path=_source

# Tìm Kiếm nhiều hơn 1 từ ( 1 cum tu, tu nao co chu nguyen la ra het )
POST players/_search
{
  "query": {
    "match": {
      "name": "nguyen"
    }
  }
}

# Search or ( Phai khop voi tat ca cac chu)
POST players/_search
{
  "query": {
    "match": {
      "name":{
        "query": "nguyen tien",
        "operator": "and"
        }
      
    }
  }
}

# Search ( chi can co 1 chu dung la se ra)

POST players/_search
{
  "query": {
    "match": {
      "name":{
        "query": "tai",
        "minimum_should_match": 1
        }
      
    }
  }
}

# Search ( chi can co 4 chu dung la se ra)
POST players/_search
{
  "query": {
    "match": {
      "name":{
        "query": "tai tai tai tai",
        "minimum_should_match": 4
        }
      
    }
  }
}

# Search theo fields các từ co trong field
POST players/_search
{
  "query": {
    "multi_match": {
        "query": "tai tai female ",
        "fields": ["name","gender"]
    }
  }
}

# Search đúng theo cum từ
POST players/_search
{
  "query": {
    "match_phrase": {
      "name": "nguyen tien teo"
    }
  }
}

# remove 1 tu de linh hoat hon
POST players/_search
{
  "query": {
    "match_phrase": {
        "name":{
          "query": "Nguyen Tien  ",
          "slop": 1
        }
      
    }
  }
}

# Search prefix tai === t 50 record

POST players/_search
{
  "query": {
    "match_phrase_prefix": {
        "name":{
          "query": "Nguyen Tien t"
        }
      
    }
  }
}

# Search prefix tai === t 1 record

POST players/_search
{
  "query": {
    "match_phrase_prefix": {
        "name":{
          "query": "Nguyen Tien t"
        }
      
    }
  }
}



