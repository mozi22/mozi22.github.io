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


data = []


def load_driver(url):
    global data

    driver.get(url)
    driver.set_page_load_timeout(20)
    wait = WebDriverWait(driver, 10)

    # wait until table loaded
    elem = wait.until(lambda x: x.find_element_by_tag_name("table"))
    rows = elem.find_elements(By.TAG_NAME, "tr")

    for idx, row in enumerate(rows[3:]):

        col = row.find_elements(By.TAG_NAME, "td")

        # print(f"{re.sub(r"^(\d+)(\))(\s)", "", col[0].text)} - {col[1].text}")

        worth_in_num = [int(s) for s in re.findall(r"\b\d+\b", col[1].text)][0]

        market_cap = (
            worth_in_num * 1000000000
            if "billion" in col[1].text
            else worth_in_num * 1000000
        )

        data.append(
            {
                "worth": market_cap,
                "data": {
                    "image": "",
                    "name": re.sub(r"^(\d+)(\))(\s)", "", col[0].text),
                },
            }
        )


load_driver("https://fknol.com/list/market-cap-sp-500-index-companies.php")
load_driver("https://fknol.com/list/market-cap-sp-500-index-companies.php?go=b100")
load_driver("https://fknol.com/list/market-cap-sp-500-index-companies.php?go=b200")
load_driver("https://fknol.com/list/market-cap-sp-500-index-companies.php?go=b300")
load_driver("https://fknol.com/list/market-cap-sp-500-index-companies.php?go=b400")

driver.close()

# save
with open("../src/assets/jsons/snp500.json", "w") as file:
    file.write(json.dumps({"date": datetime.now().strftime("%d %B, %Y"), "data": data}))
