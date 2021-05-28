import json
from datetime import datetime

import requests
from bs4 import BeautifulSoup
from tqdm import tqdm

print("\nScrapping GDP")
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

url = "https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)"
req = requests.get(url, headers)
soup = BeautifulSoup(req.content, "html.parser")
table = soup.find_all("table")[4].findChildren("tr")


data = []
for result in tqdm(table[2:-1]):

    # gdp_per_WB

    country_img = f'https:{result.find("img")["src"]}'
    country_name = result.find("a").text

    table_td = result.find_all("td")

    country_gdp = float(table_td[1].text.replace(",", ""))
    country_gdp = round(country_gdp) if country_gdp > 1 else country_gdp

    data.append(
        {
            "worth": country_gdp * 1000000,
            "data": {
                "image": country_img,
                "name": country_name,
            },
        }
    )


with open("../src/assets/jsons/country_gdp.json", "w") as file:
    file.write(json.dumps({"date": datetime.now().strftime("%d %B, %Y"), "data": data}))
