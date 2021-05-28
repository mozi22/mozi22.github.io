import json
import re
import time
from datetime import datetime

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from tqdm import tqdm

from webdriver_manager.chrome import ChromeDriverManager

print("\nScrapping Athletes")
print(
    "---------------------------------------------------------------------------------"
)

driver = webdriver.Chrome(ChromeDriverManager().install())

driver.get("https://www.forbes.com/athletes/list")
driver.set_page_load_timeout(20)
wait = WebDriverWait(driver, 10)

# wait until table loaded
elem = wait.until(lambda x: x.find_element_by_tag_name("table"))

# scroll the page to the bottom to load all records (which are loaded on scroll)
last_height = driver.execute_script("return document.body.scrollHeight")
while True:
    # Scroll down to bottom
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait to load page
    time.sleep(3)

    # Calculate new scroll height and compare with last scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

# reload the table since new elements are added to it after scroll

elem = wait.until(lambda x: x.find_element_by_tag_name("table"))

h = driver.execute_script("return arguments[0].innerHTML;", elem)
driver.close()
soup = BeautifulSoup(h, "html.parser")

# create data
data = []
for idx, record in enumerate(tqdm(soup.find_all("tr"))):
    if idx == 0:
        continue
    elif idx == 3:
        worth = float(104)
    else:
        try:
            worth = float(re.findall(r"\d+.?\d+", record.find_all("td")[3].text)[0])
        except:
            continue

    image = f'https:{record.find("img")["src"]}'
    name = record.find_all("td")[2].text
    sport = record.find_all("td")[6].text

    data.append(
        {
            "worth": worth * 1000000,
            "data": {
                "image": image,
                "name": name,
                "sports": sport,
            },
        }
    )


# save
with open("../src/assets/jsons/athlete.json", "w") as file:
    file.write(json.dumps({"date": datetime.now().strftime("%d %B, %Y"), "data": data}))
