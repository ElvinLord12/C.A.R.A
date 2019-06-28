import credentials
import pysftp

host = credentials.host
user = credentials.user
password = credentials.password

with pysftp.Connection(host=host,username=user, password=password) as sftp:
    print("Grabbed connection success ...")

    # local path
    local_path = "C:\\Users\\Milo Rue\\MockupApp\\app\\db\\test.db"

    # database file path
    db_path = '/home/mrue/public_html/appDB.db'

    sftp.put(local_path, db_path)
