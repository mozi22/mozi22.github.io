import json
import re

import requests
from bs4 import BeautifulSoup

from millify import millify

headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "3600",
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0",
}

url = "https://en.wikipedia.org/wiki/Forbes%27_list_of_the_world%27s_highest-paid_athletes"
req = requests.get(url, headers)
soup = BeautifulSoup(req.content, "html.parser")
table = soup.find_all("table")[1].findChildren("tr")

data = []
for idx, result in enumerate(table[1:]):

    athlete_country_img = f'https:{result.find("img")["src"]}'
    athlete_country_name = result.find_all("td")[2].find_all("a")[-1].text
    wealth = float(re.findall(r"\d+.?\d+", result.find_all("td")[4].text)[0])
    athlete_name = result.find("a").text
    sport = result.find_all("td")[2].text
    rank = idx

    country_gdp_per_btc = 0

    data.append(
        {
            "worth": wealth * 1000000,
            "data": {
                "name": athlete_name,
                "country": {
                    "image": athlete_country_img,
                    "name": athlete_country_name,
                },
                "sports": sport,
            },
        }
    )


with open("../src/assets/jsons/athlete.json", "w") as file:
    file.write(json.dumps(data))
