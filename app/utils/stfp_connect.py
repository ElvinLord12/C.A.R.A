import pysftp
import credentials

host = credentials.host
user = credentials.user
password = credentials.password

with pysftp.Connection(host=host, username=user,password=password) as sftp:
    print("Connection successfully established ...")

    # remote directory
    # sftp.cwd('/home/mrue/')

    # database file path
    db_path = '/home/mrue/testDB.db'

    # local path
    local_path = "C:\\Users\\Milo Rue\\MockupApp\\app\\db\\test.db"

    # gets file for download
    sftp.get(remotepath=db_path, localpath=local_path)

    # grabs structure of directory
    # directory_struct = sftp.listdir_attr()



    # data dump

    # for attr in directory_struct:
    #     print (attr.filename, attr)
