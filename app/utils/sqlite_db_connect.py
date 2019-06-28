import sqlite3

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

connection = sqlite3.connect('C:\\Users\\Milo Rue\\MockupApp\\app\\db\\test.db')
connection.row_factory = dict_factory

# connect to the database check
print("Database connected successfully")

cursor = connection.cursor()
cursor.execute("INSERT INTO USERS VALUES(2,'barr','ICCS19','barr@ithaca.edu','John Barr');")
cursor.execute("SELECT * from USERS")

results = cursor.fetchall()

print(results)

print("Operations completed success")
connection.close
