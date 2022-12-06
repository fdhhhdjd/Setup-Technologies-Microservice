***** Elasticsearch-Kibana (Past 1) ****
# Quey Code 
Click Devtool 

# Add Data
POST microservice/_doc
{"@timestamp":"2020-06-12","username":"Nguyễn Tài Đức","url_profile":"https://taiduc.cf"}

# Add multiple Data
POST microservice/_bulk
{"create":{}}
{"@timestamp":"2022-06-12","username":"Thái Văn Nam","url_profile":"https://thainam.cf"}
{"create":{}}
{"@timestamp":"2021-05-13","username":"Nguyễn Duy Thinh","url_profile":"https://duythinh.cf"}
{"create":{}}
{"@timestamp":"2022-05-14","username":"Nguyễn Thành Tất","url_profile":"https://thanhtat.cf"}
{"create":{}}
{"@timestamp":"2021-03-16","username":"Gia Bảo","url_profile":"https://giabao.cf"}saá

# controller index ( Watch Record ) Or Click Stack Management -> Index Management
GET _cat/indices

# Search Data (Get all and Sort Desc-Giam or Asc-Tang )
GET microservice/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "@timestamp": {
        "order": "desc"
      }
    }
  ]
}

# Search Data Fields

GET microservice/_search
{
  "query": {
    "match_all": {}
  },
  "fields": [
    "@timestamp",
    "username"
  ],
  "_source": false, 
  "sort": [
    {
      "@timestamp": {
        "order": "desc"
      }
    }
  ]
}




