import pymongo
import requests
import time
import json
from bson import json_util

def db_init():

    client = pymongo.MongoClient()
    db = client.WeatherPics

    base1 = "http://api.wunderground.com/api/a2ee2bc849417a1d/forecast/q/"
    base2 = "http://api.wunderground.com/api/a2ee2bc849417a1d/conditions/q/"


    url_tails = ["Australia/Sydney.json", "CA/San_Francisco.json","CA/Cupertino.json","NY/New_York.json", 
            "India/Pune.json", "India/Mumbai.json", "GA/Atlanta.json", "India/Bangalore.json"];

    keys = ['Sydney', 'San_Francisco', 'Cupertino', 'New_York', 'Pune', 'Mumbai', 'Atlanta', 'Bangalore']
    


    index1 = 'forecast'
    index2 = 'current_observation'

    for i in xrange(len(url_tails)):
        url = base1 + url_tails[i]
        print 'Querying ' + url
        print
        print 
        req = requests.get(url)
        print 'print full req'
        print req.json()
        print 
        print
        print 'print current obs'
        print req.json()[index1]
        print 
        print 

        result = db.WeatherInfo.insert_one(
                {
                    'location': keys[i],
                    'weather_observation': req.json()[index1]
                }
            )
        print
        print result.inserted_id
        time.sleep(10)

def db_update_all():
    print 'Updating weather info of all cities'
    client = pymongo.MongoClient()
    db = client.WeatherPics
    base1 = "http://api.wunderground.com/api/a2ee2bc849417a1d/forecast/q/"
    base2 = "http://api.wunderground.com/api/a2ee2bc849417a1d/conditions/q/"


    url_tails = ["Australia/Sydney.json", "CA/San_Francisco.json","CA/Cupertino.json","NY/New_York.json", 
            "India/Pune.json", "India/Mumbai.json", "GA/Atlanta.json", "India/Bangalore.json"];

    keys = ['Sydney', 'San_Francisco', 'Cupertino', 'New_York', 'Pune', 'Mumbai', 'Atlanta', 'Bangalore']
    


    index1 = 'forecast'
    index2 = 'current_observation'

    for i in xrange(len(url_tails)):
        print 'updating weather info of '+ keys[i]
        url = base1 + url_tails[i]
        print 'Querying ' + url
        print
        print 
        req = requests.get(url)
        print 'got request'
        print req.json()
        print 
        print
        result = db.WeatherInfo.update_one(
                {'location': keys[i] },
                {
                    '$set':{'weather_observation': req.json()[index1]}
                }
            )
        print
        print result.matched_count
        time.sleep(10)

def db_get_all_weather():
    client = pymongo.MongoClient()
    db = client.WeatherPics
    
    stuff = list()
    cursor = db.WeatherInfo.find()
    for result in cursor:
        json_doc = json.dumps(result, default=json_util.default)
        stuff.append(json_doc)
        print result
        print

    return stuff


# db_get_all_weather()
# db_update_all()