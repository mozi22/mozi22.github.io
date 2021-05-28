import json
import re
from datetime import datetime

import requests
from bs4 import BeautifulSoup
from tqdm import tqdm

print("\nScrapping Houses")
print(
    "---------------------------------------------------------------------------------"
)

headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "3600",
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0",
}

url = "https://www.beautifullife.info/urban-design/15-of-the-most-expensive-houses-in-the-world/"
req = requests.get(url, headers)
soup = BeautifulSoup(req.content, "html.parser")
table = soup.find_all("table")[0].findChildren("tr")

data = []
for result in tqdm(table[1:-1]):

    tds = result.find_all("td")

    house_img = tds[0].find("img")["data-lazy-src"]
    house_location = tds[1].text
    house_year = tds[2].text
    house_owner = tds[3].text
    house_space = tds[4].text

    worth_in_num = [int(s) for s in re.findall(r"\b\d+\b", tds[5].text)][0]
    house_worth = (
        worth_in_num * 1000000000
        if "billion" in tds[5].text
        else worth_in_num * 1000000
    )

    data.append(
        {
            "worth": house_worth,
            "data": {
                "image": house_img,
                "name": f"{house_owner} ({house_location})",
                "location": house_location,
                "year": house_year,
                "area": house_space,
            },
        }
    )

# save
with open("../src/assets/jsons/houses.json", "w") as file:
    file.write(json.dumps({"date": datetime.now().strftime("%d %B, %Y"), "data": data}))
