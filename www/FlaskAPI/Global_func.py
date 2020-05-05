import pymysql
from flask import jsonify, request, session


def mustlist(jsondata, mustlst):
    return all(item in jsondata for item in mustlst)


def CheckUser():
    if "email" in session:
        values = {
            "name": session["name"],
            "email": session["email"]}
        return values
    else:
        return False


class Database:
    def __init__(self):
        host = "generaldb.cuqt2fxorqci.ap-southeast-2.rds.amazonaws.com"
        user = "admin"
        password = "Project123"
        db = "generaldb"
        self.con = pymysql.connect(host=host, user=user, password=password, db=db, cursorclass=pymysql.cursors.
                                   DictCursor)
        self.cur = self.con.cursor()

    def Insert_user_data(self, data):
        self.cur.execute("INSERT INTO UserData (firstname, lastname, email, company, password_hash) VALUES ('{}','{}','{}','{}','{}');".format(
            data["fname"], data["lname"], data["email"], data["company"], data["password"]))
        self.con.commit()
        result = self.cur.fetchall()
        return result

    def end_connection(self):
        self.cur.close()
        self.con.close()

    def Get_user_cred(self, email):
        self.cur.execute("SELECT * FROM UserData WHERE email='"+email+"';")
        self.con.commit()
        result = self.cur.fetchall()
        return result

    def Insert_Project_data(self, uid, projectid):
        self.cur.execute(
            "INSERT INTO Project (Uid, ProjectName) VALUES ('{}','{}');".format(uid, projectid))
        self.con.commit()
        return

    def list_Projects(self, uid):
        self.cur.execute("SELECT * FROM Project WHERE Uid='{}';".format(uid))
        self.con.commit()
        result = self.cur.fetchall()
        projects = []
        for rows in result:
            projects.append(rows["ProjectName"])
        return projects

    def createFile(self, filename, randfilename, projectname, uid):
        self.cur.execute(
            "SELECT ProjectID FROM Project WHERE Uid='{}' AND ProjectName ='{}'".format(uid, projectname))
        self.con.commit()
        result = self.cur.fetchall()
        try:
            result[0]['ProjectID']
        except:
            return False
        self.cur.execute("INSERT INTO Files (FileID, ProjectID, OriginalName) VALUES ('{}','{}','{}');".format(
            randfilename, result[0]['ProjectID'], filename))
        self.con.commit()
        return True

    def get_list_of_files(self, projectname, uid):
        row_count = self.cur.execute(
            "SELECT ProjectID FROM Project WHERE Uid='{}' AND ProjectName ='{}'".format(uid, projectname))
        self.con.commit()
        result = self.cur.fetchall()
        if(row_count > 0):
            row_count = self.cur.execute(
                "SELECT OriginalName FROM Files WHERE ProjectID ='{}'".format(result[0]['ProjectID']))
            self.con.commit()
            result = self.cur.fetchall()
            listOfFileNames = []
            if(row_count > 0):
                for file_names in result:
                    listOfFileNames.append(file_names["OriginalName"])
            return listOfFileNames
        else:
            return False

    def is_User_Allowed_To_Access_File(self, projectname, filename, uid):
        row_count = self.cur.execute(
            "SELECT ProjectID FROM Project WHERE Uid='{}' AND ProjectName ='{}'".format(uid, projectname))
        self.con.commit()
        result = self.cur.fetchall()
        if(row_count == 0):
            return False
        row_count = self.cur.execute("SELECT FileID FROM Files WHERE ProjectID ='{}' and OriginalName='{}'".format(
            result[0]['ProjectID'], filename))
        self.con.commit()
        result = self.cur.fetchall()
        if row_count == 0:
            return False
        else:
            return result[0]['FileID']
