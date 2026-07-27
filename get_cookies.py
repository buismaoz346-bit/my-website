import os
import json
import base64
import sqlite3
import win32crypt
from Crypto.Cipher import AES
import shutil

local_state_path = os.path.join(os.environ["USERPROFILE"], r"AppData\Local\BraveSoftware\Brave-Browser\User Data\Local State")
cookies_path = os.path.join(os.environ["USERPROFILE"], r"AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\Network\Cookies")

if not os.path.exists(local_state_path):
    print("No Brave profile found.")
    exit(1)

with open(local_state_path, "r", encoding="utf-8") as f:
    local_state = json.loads(f.read())
key = base64.b64decode(local_state["os_crypt"]["encrypted_key"])[5:]
decrypted_key = win32crypt.CryptUnprotectData(key, None, None, None, 0)[1]

db_path = "temp_cookies.db"
if os.path.exists(db_path): os.remove(db_path)
shutil.copyfile(cookies_path, db_path)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("SELECT name, encrypted_value FROM cookies WHERE host_key LIKE '%linkedin.com'")

cookies = {}
for name, encrypted_value in cursor.fetchall():
    try:
        iv = encrypted_value[3:15]
        payload = encrypted_value[15:]
        cipher = AES.new(decrypted_key, AES.MODE_GCM, iv)
        decrypted_value = cipher.decrypt(payload)[:-16].decode()
        cookies[name] = decrypted_value
    except Exception:
        pass
        
print("li_at:", cookies.get("li_at"))
print("JSESSIONID:", cookies.get("JSESSIONID"))
conn.close()
