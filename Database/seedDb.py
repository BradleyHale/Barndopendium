import csv
import re
import sqlite3
connection = sqlite3.connect('plans.db')
cursor = connection.cursor()
#
# dimensions = []
cursor.execute("CREATE TABLE IF NOT EXISTS plans(planID,overallSQF,heatedCooledSQF,length,width,sidewallLength,stories,bedrooms,bathrooms,halfBaths,saferoom)")
# TO DO LIST: store inches and feet as different columns
with open('../Copy of Barndominium Catalog.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile)
    for row in spamreader:
        print(f"planID: {row[0]}")
        # printing overall square feet
        if row[1] != '':
            print(f"overallSQF: {int(row[1])}")
            int(row[1])
        else:
            print("overallSQF:")
        #printing heated and cooled Square Feet
        if row[2] != '':
            print(f"heatedCooledSQF: {int(row[2])}")
            row[2] = int(row[2])
        else:
            print("heatedCooledSQF:")
        # printing LENGTH, formatted to remove inches and non-numerals and int typecast  --- needs to be rewritten
        x = row[3].split('\'')
        feetString = x[0]
        if feetString != '':
            feetString = re.sub("\D",'',feetString)
            feet = int(feetString) * 12
            # dimensions[0] = feet # length feet - unused (yet)
            inchString = x[1]
            if inchString != '':
                inchString = re.sub("\D",'',inchString) # gets rid of non-numerals in string
                inches = int(inchString)
               # dimensions[1] = inches # length inches - unused (yet)
            else:
                inches = 0
            print((f"length: {feet / 12} ft {feet % 12} in"))
            row[3] = feet + inches
        else:
            print(f"length:")
        # printing WIDTH, formatted and typecasted as above --- needs to be rewritten
        x = row[4].split('\'')
        feetString = x[0]
        if feetString != '':
            feetString = re.sub("\D",'',feetString)
            feet = int(feetString) * 12
           # dimensions[2] = feet # width feet - unused (yet)
            inchString = x[1]
            if inchString != '':
                inchString = re.sub("\D",'',inchString)
                inches = int(inchString)
               # dimensions[3] = inches # width inches - unused (yet)
            else:
                inches = 0
            print(f"width: {feet / 12} ft {inches % 12} in")
            row[4] = feet + inches
        else:
            print(f"width:")
        # printing SIDEWALL LENGTH, formatting and typecasted as above --- needs to be rewritten
        x = row[5].split('\'')
        feetString = x[0]
        if feetString != '':
            feetString = re.sub("\D", '',feetString)
            feet = int(feetString) * 12
           # dimensions[4] = feet # sidewallLengthFeet - unused (yet)
            inchString = x[1]
            if inchString != '':
                inchString = re.sub("\D",'',inchString)
                inches = int(inchString)
              #  dimensions[5] = inches # sidewallLengthInches - unused (yet)
            else:
                inches = 0
            print(f"sidewallLength: {feet / 12} ft {feet % 12} in")
            row[5] = feet + inches
        else:
            print (f"sidewall length:")
        # PRINT FLOORS
        if row[6] != '':
            print(f"floors: {int(row[6])}")
            row[6] = int(row[6])
        else:
            print("floors:")
        if row[7] != '':
        #PRINT BEDS
            print(f"#ofbeds: {int(row[7])}")
            row[7] = int(row[7])
        else:
            print("#ofbeds:")
        #PRINT BATHS
        if row[8] != '':
            print(f"#ofbaths: {int(row[8])}")
            row[8] = int(row[8])
        else:
            print("#ofbaths:")
        #PRINT HALF BATHS
        if(row[9]) != '':
            print(f"#OfHalfBaths: {int(row[9])}")
            row[9] = int(row[9])
        else:
            print("#OfHalfBaths:")
        #SAFEROOM? # if string == yes, typecast into true, else typecast into false
        saferoomVal = row[10]
        if saferoomVal == "No":
            row[10] = False
        elif saferoomVal == "Yes":
            row[10] = True
        else:
            saferoomVal = "saferoom not recorded in this entry \n"
        print(f"saferoom: {saferoomVal}")
        print()
        inputs = row[:11] # slice row at el 11
        cursor.execute("INSERT INTO PLANS (planID, overallSQF, heatedCooledSQF,length,width,sidewallLength, stories, bedrooms, bathrooms, halfBaths, saferoom) VALUES (?,?,?,?,?,?,?,?,?,?,?)",inputs)
        connection.commit()
connection.close()