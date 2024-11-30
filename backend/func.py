import os
import requests
import json
import base64

def save_img(img:str, path:str, photo_name:str):
    image = base64.b64decode(img)
    filename = os.path.join(path+'/', photo_name)[1:]
    with open(filename, 'wb') as file:
        file.write(image)


def filling_json(data, pathImg, pathJson):
    default_values = {
        "slice": 2,
        "consumption": 0.3,
        "complexity": 0.1,
        "doorArea": 0.8,
        "roofArea": 0.9,
        "hoodArea": 1.2,
        "flameWidth": 0.1,
        "flareDeparture": 0.08
    }

    for key in default_values:
        if key not in data:
            data[key] = default_values[key]

    with open(pathJson[1:] + f'\\{data["uid"]}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    # download_image(data["Photo"])

    save_img(data['photo'], pathImg, data['photo_name'])



