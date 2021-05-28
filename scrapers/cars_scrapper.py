import json
from datetime import datetime

import requests
from bs4 import BeautifulSoup
from tqdm import tqdm

print("\nScrapping Cars")
print(
    "---------------------------------------------------------------------------------"
)


def is_url_image(image_url):
    image_formats = ("image/png", "image/jpeg", "image/jpg")
    r = requests.head(image_url)
    if r.headers["content-type"] in image_formats:
        return True
    return False


def parsed_to_real_name(parsed_name):
    if parsed_name == "ford-gt-mk-ii":
        return "ford-gt-2017"
    elif parsed_name == "mercedes-benz-amg-gt-black-series":
        return "mercedes-benz-amg-gt-r-black-series-3"
    elif parsed_name == "aston-martin-dbs-superleggera-":
        return "aston-martin-dbs-superleggera"
    elif parsed_name == "aston-martin-vantage-gt8-mk-i":
        return "aston-martin-vantage-gt8-2"
    elif parsed_name == "lamborghini-huracán-sto":
        return "lamborghini-huracn-sto-n-a"
    elif parsed_name == "bentley-continental-gt-speed-cabrio-mk-ii-facelift":
        return "bentley-continental-gt-speed-cabrio"
    elif parsed_name == "porsche-911-gt2-rs-997":
        return "porsche-911-gt2-rs"
    elif parsed_name == "lamborghini-huracán-evo":
        return "lamborghini-huracn-evo"
    elif parsed_name == "lamborghini-huracán-performante":
        return "lamborghini-huracn-performante"
    elif parsed_name == "bentley-continental-gt-v8-mk-iii":
        return "bentley-continental-gt-v8-n-a"
    elif parsed_name == "bentley-continental-gt-speed-convertible-mk-i":
        return "bentley-continental-gtc-speed"
    elif parsed_name == "audi-r8-v10-spyder-performance-mk-ii-facelift":
        return "audi-r8-v10-spyder-performance"
    elif parsed_name == "aston-martin-db11-amr-":
        return "aston-martin-db11-amr"
    elif parsed_name == "audi-r8-spyder-v10-plus-mk-ii":
        return "audi-r8-spyder-v10-plus"
    elif parsed_name == "aston-martin-db11":
        return "aston-martin-db11-n-a"
    elif parsed_name == "audi-r8-v10-performance-mk-ii-facelift":
        return "audi-r8-v10-performance-3"
    elif parsed_name == "audi-r8-gt-mk-i":
        return "audi-r8-gt"
    elif parsed_name == "mercedes-benz-s-63-4matic+-cabriolet":
        return "mercedes-benz-s-63-4matic-cabriolet"
    elif parsed_name == "porsche-911-r-991":
        return "porsche-911r"
    elif parsed_name == "porsche-911-turbo--992":
        return "porsche-911-turbo-992"
    elif parsed_name == "bmw-x5-m--f95":
        return "bmw-x5-m-f95"
    else:
        return parsed_name


headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "3600",
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0",
}

url = "https://fastestlaps.com/lists/top-most-expensive-cars"
req = requests.get(url, headers)
soup = BeautifulSoup(req.content, "html.parser")
tr = soup.find_all("tr")

data = []
for idx, result in enumerate(tqdm(tr[1:])):
    href = result.find_all("td")[1].find("a")["href"]

    name = result.find_all("td")[1].text
    image = f'https://media.fastestlaps.com/{parsed_to_real_name(name.lower().replace(" ", "-").replace(".", "-").replace("(", "").replace(")", "").replace("competition", ""))}.jpg?550x250m'
    worth = int(result.find_all("td")[2].text.replace(",", "").replace("€", ""))

    if is_url_image(image) == False:
        image = image.replace(".jpg", ".png")

    data.append(
        {
            "worth": worth * 1.2,
            "data": {
                "url": f"https://fastestlaps.com{href}",
                "name": name,
                "image": image,
            },
        }
    )


with open("../src/assets/jsons/cars.json", "w") as file:
    file.write(json.dumps({"date": datetime.now().strftime("%d %B, %Y"), "data": data}))
