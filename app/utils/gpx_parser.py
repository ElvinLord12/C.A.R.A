import gpxpy
import gpxpy.gpx
#Parse an existing file
import functools
import operator
import decimal

def main(filename):

    longitude = 0
    latitude = 0

    gpx_file = open(filename, 'r')

    gpx = gpxpy.parse(gpx_file)

    file = open("trace.js", "a")
    file.write("export default [")

    for track in gpx.tracks:
        for segment in track.segments:
            for point in segment.points:
                lat = str(decimal.Decimal(point.latitude))
                lon = str(decimal.Decimal(point.longitude))
                # print('{latitude: ', lat, ' longitude: ', lon, '},')
                string = '{latitude: ', lat, ', longitude: ', lon, '},'
                string1 = functools.reduce(operator.add,string)
                print(string1)
                file.write(string1)
    file.write("]")

    file.close()

main('C://Users/Milo Rue/MockupApp/app/gpx/test.gpx')