import sqlite3
conn = sqlite3.connect('temp.db')
cursor = conn.cursor()
cursor.execute("SELECT host_key, name FROM cookies WHERE host_key LIKE '%linkedin%'")
for row in cursor.fetchall():
    print(row)
