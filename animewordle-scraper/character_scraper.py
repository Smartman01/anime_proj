import requests
from bs4 import BeautifulSoup
import json

URL = "https://www.anime-planet.com/characters/top-loved"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

results = soup.find(class_="pure-table striped stickyHeader")

images = results.find_all("img")
charInfo = results.find_all(class_="tableCharInfo")
anime = results.find_all(class_="tableAnime")

# print(results.prettify())
# print(charInfo[0].find_all("a"))
# print(images[0]["alt"]) # name
# print(images[0]["src"]) # image link

f = open("character_json.json", "w")

json_arr = []

for i in range(len(images)):
    traits_tags = []
    animes = []

    a = charInfo[i].find_all("a")[1:]
    for t in a:
        traits_tags.append(t.text)
    
    an = anime[i].find_all("div")[0].find_all("a")
    for x in an:
        animes.append(x.text)
    
    j = {
        "name" : images[i]["alt"],
        "image" : images[i]["src"],
        "characteristics" : traits_tags,
        "animes" : animes
    }

    json_arr.append(j)

f.write(json.dumps(json_arr))

f.close()