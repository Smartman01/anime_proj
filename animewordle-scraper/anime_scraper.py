import requests
from bs4 import BeautifulSoup
import json
import base64

URL = "https://www.anime-planet.com/anime/all"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

results = soup.find(class_="cardDeck cardGrid")

a_tags = results.find_all("a")
img_tags = results.find_all("img")

# print(img_tags)
# print(res.find(class_="tags").find_all("li")[0].text)

def get_as_base64(url):
    return base64.b64encode(requests.get(url).content).decode('utf-8')

f = open("anime_json.json", "w")

json_arr = []

for i in range(len(a_tags)):
    res = BeautifulSoup(a_tags[i]["title"], 'lxml')
    anime_tags = res.find(class_="tags").find_all("li")

    tags = []
    for j in range(len(anime_tags)):
        tags.append(anime_tags[j].text)
    
    j = {
        "name" : img_tags[i]["alt"],
        "image" : get_as_base64(img_tags[i]["data-src"]),
        "characteristics" : tags
    }

    json_arr.append(j)


f.write(json.dumps(json_arr))

f.close()