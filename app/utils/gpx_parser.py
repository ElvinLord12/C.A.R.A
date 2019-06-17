import gpxpy
import gpxpy.gpx
#Parse an existing file


def main():

    longitude = 0
    latitude = 0

    gpx_file = open("C:/Users/Milo Rue/MockupApp/app/gpx/test.gpx", 'r')

    gpx = gpxpy.parse(gpx_file)

    for track in gpx.tracks:
        for segment in track.segments:
            for point in segment.points:
                print('latitude: {0}, longitude: {1}'.format(point.latitude, point.longitude))
                latitude = '{0}'.format(point.latitude)
                longitude = '{0}'.format(point.longitude)
                print ('Variables: ' + latitude + ' | ' + longitude)


main()