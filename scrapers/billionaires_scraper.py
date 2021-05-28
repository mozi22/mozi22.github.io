import json
from datetime import datetime

import requests
from tqdm import tqdm

from millify import millify

print("\nScrapping Billionaires")
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

url = "https://forbes400.herokuapp.com/api/forbes400"
req = requests.get(url, headers)

data = []

for row in tqdm(json.loads(req.content)):
    name = row["person"]["name"]
    originalValue = row["finalWorth"]

    if row["person"]["imageExists"]:
        prepend = "https:"
        if "https" in row["person"]["squareImage"]:
            prepend = ""

        image = f"{prepend}{row['person']['squareImage']}"
    else:
        image = ""
    worthAsBTC = 0

    data.append(
        {"worth": originalValue * 1000000, "data": {"image": image, "name": name}}
    )

with open("../src/assets/jsons/billionaires.json", "w") as file:
    file.write(json.dumps({"date": datetime.now().strftime("%d %B, %Y"), "data": data}))
