import credentials
import pysftp

host = credentials.host
user = credentials.user
password = credentials.password

with pysftp.Connection(host=host,username=user, password=password) as sftp:
    print("Grabbed connection success ...")

    # local path
    local_path = "C:\\Users\\Milo Rue\\MockupApp\\app\\utils\\sqlite_db_connect.py"

    # database file path
    db_path = '/home/mrue/public_html/db_connect.py'

    sftp.put(local_path, db_path)
