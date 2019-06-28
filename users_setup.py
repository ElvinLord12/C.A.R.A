import sqlite3


db = 'C:\\Users\\Milo Rue\\MockupApp\\app\\db\\test.db'
def create_connection(database):
    try:
        connection = sqlite3.connect(database)
        return connection
    except FileNotFoundError as e:
        print(e)

    return None


def create_user_table(connection):
    cursor = connection.cursor()
    cursor.execute('CREATE TABLE USERS( '
                   'UUID INT PRIMARY KEY NOT NULL,'
                   'USERNAME TEXT NOT NULL,'
                   'PASSWORD CHAR(25) NOT NULL,'
                   'EMAIL CHAR(50) NOT NULL,'
                   'FULLNAME TEXT NOT NULL);')

# create_user_table(create_connection(db))