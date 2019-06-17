import sqlite3
connection = sqlite3.connect('C:\\Users\\Milo Rue\\MockupApp\\app\\db\\test.db')

print("Database connected successfully")

def insert_sqlite():
    connection.execute("INSERT INTO COOP(ID,NAME,AGE,ADDRESS,SALARY) \
      VALUES (1, 'Paul', 32, 'California', 20000.00 )");

    connection.execute("INSERT INTO COOP(ID,NAME,AGE,ADDRESS,SALARY) \
      VALUES (2, 'Allen', 25, 'Texas', 15000.00 )");

    connection.execute("INSERT INTO COOP(ID,NAME,AGE,ADDRESS,SALARY) \
      VALUES (3, 'Teddy', 23, 'Norway', 20000.00 )");

    connection.execute("INSERT INTO COOP(ID,NAME,AGE,ADDRESS,SALARY) \
      VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00 )");

    connection.commit()

    print("Tabled created")

cursor = connection.execute("SELECT id,name,address,salary from COOP")
for row in cursor:
    print("ID = ", row[0])
    print("NAME = ", row[1])
    print("ADDRESS = ", row[2])
    print("SALARY = ", row[3], "\n")

print("Operations completed success")
connection.close