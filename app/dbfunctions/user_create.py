import uuid
from users_setup import *


def create_user(fullname, email, username, password, c):
    id = str(uuid.uuid4())
    print("UUID: ",id)
    # c.execute("INSERT INTO USERS VALUES(UUID,USERNAME,PASSWORD,EMAIL,FULLNAME)",
    #           (1,username,password,email,fullname))

    c.execute("SELECT * FROM USERS;")


data= 'C:\\Users\\Milo Rue\\MockupApp\\app\\db\\test.db'
cursor = create_connection(data)
create_user("Milo Rue", "mrue@ithaca.edu", "mrue", "ICCS19", cursor)