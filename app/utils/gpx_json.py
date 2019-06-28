import json
import gpxpy
import gpxpy.gpx
import os

import functools
import operator
import decimal
import clean_trace.py

# person_string = '{"name": "Bob", "languages": "English", "numbers": [2, 1.6, null]}'
# # Getting dictionary
# person_dict = json.loads(person_string)
# # Pretty Printing JSON string back
# print(json.dumps(person_dict, indent = 4, sort_keys=True))

longitude = 0
latitude = 0

gpx_file = open('C://Users/Milo Rue/MockupApp/app/gpx/test.gpx', 'r')

file = open("trace.json", "a")

gpx = gpxpy.parse(gpx_file)

file.write("[")

for track in gpx.tracks:
    for segment in track.segments:
        for point in segment.points:
            lat = str(decimal.Decimal(point.latitude))
            lon = str(decimal.Decimal(point.longitude))
            # print('{latitude: ', lat, ' longitude: ', lon, '},')
            string1 = {"latitude": lat, "longitude": lon}
            print(string1)
            file.write(json.dumps(string1,indent = 4, sort_keys=True))
            file.write(",")

