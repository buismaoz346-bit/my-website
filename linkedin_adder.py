import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

certs = [
    {"name": "Best Project Award", "org": "COMSATS University", "month": "February", "year": "2026"},
    {"name": "Inovatex Project 2025", "org": "Inovatex", "month": "February", "year": "2026"},
    {"name": "Kangaroo Test Achievement", "org": "Kangaroo Sans Frontieres", "month": "February", "year": "2026"},
    {"name": "IET On Campus Leadership", "org": "Institution of Engineering and Technology (IET)", "month": "February", "year": "2026"},
    {"name": "Arduino & IoT", "org": "Cardiff Institute", "month": "February", "year": "2026"},
    {"name": "Unleashing Creativity with AI", "org": "COMSATS University", "month": "February", "year": "2026"},
    {"name": "IET On Campus Recognition", "org": "Institution of Engineering and Technology (IET)", "month": "February", "year": "2026"},
    {"name": "Student Week SP26 Certificate", "org": "COMSATS University", "month": "February", "year": "2026"},
    {"name": "3D Printing Certificate", "org": "COMSATS University", "month": "February", "year": "2026"},
    {"name": "Solar Solution for Pakistan", "org": "COMSATS University", "month": "February", "year": "2026"}
]

print("Initializing Brave Browser...")
options = webdriver.ChromeOptions()
options.binary_location = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
driver = webdriver.Chrome(options=options)
driver.get("https://www.linkedin.com/login")

print("==========================================================")
print(" PLEASE LOG IN TO LINKEDIN IN THE OPENED BROWSER WINDOW.")
print("==========================================================")

# Wait until user logs in (URL changes from login)
WebDriverWait(driver, 300).until(
    lambda d: "feed" in d.current_url or "in/" in d.current_url
)
print("Login successful! Starting automation...")
time.sleep(3)

for cert in certs:
    try:
        driver.get("https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME")
        time.sleep(4)
        
        # Fill Name
        name_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//label[contains(., 'Name')]/following-sibling::div//input"))
        )
        name_input.clear()
        name_input.send_keys(cert["name"])
        time.sleep(1)
        
        # Fill Organization
        org_input = driver.find_element(By.XPATH, "//label[contains(., 'Issuing organization')]/following-sibling::div//input")
        org_input.clear()
        org_input.send_keys(cert["org"])
        time.sleep(1)
        org_input.send_keys(Keys.RETURN)
        time.sleep(1)
        
        # Handle Date Using Tab navigation from org_input to avoid complex dropdown logic
        # Tab 1 -> Month
        org_input.send_keys(Keys.TAB)
        time.sleep(0.5)
        focused = driver.switch_to.active_element
        focused.send_keys(cert["month"])
        time.sleep(0.5)
        focused.send_keys(Keys.RETURN)
        
        # Tab 2 -> Year
        focused.send_keys(Keys.TAB)
        time.sleep(0.5)
        focused = driver.switch_to.active_element
        focused.send_keys(cert["year"])
        time.sleep(0.5)
        focused.send_keys(Keys.RETURN)
        
        time.sleep(1)

        # Click Save
        save_btn = driver.find_element(By.XPATH, "//button[span[text()='Save']]")
        save_btn.click()
        
        # Wait for save
        time.sleep(5)
        print(f"[SUCCESS] Added {cert['name']}")
    except Exception as e:
        print(f"[ERROR] Failed to add {cert['name']}: {e}")

print("All done! You can close the browser now.")
driver.quit()
