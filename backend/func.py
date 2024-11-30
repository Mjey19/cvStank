import os
import json
import base64
import shutil


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


# \/ \/ \/ \/ \/ \/ \/
# STUPID FAKE CODE HERE
# \/ \/ \/ \/ \/ \/ \/
def func_egor():
    fake = {
        "area": 1,
        "consumption": 2,
        "time": 3,
        "money": 52
    }
    return fake


def copyImg(name):
    out_path = f'static/images/output/{name}.jpg'
    base_url = 'http://127.0.0.1:5000'
    shutil.copy2(f'static/images/input/{name}.jpg', out_path)
    return f'{base_url}/{out_path}'



def new_json(uid, dict = func_egor()):
    dict["imageUrl"] = copyImg(uid)
    with open(f'static/data/output/{uid}.json', "w") as file:
        json.dump(dict, file)

 
def delete_files_in_folder(folder_path):
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f'Ошибка при удалении файла {file_path}. {e}')


def del_image():
    delete_files_in_folder("static/data/input")
    delete_files_in_folder("static/data/output")
    delete_files_in_folder("static/data/input")
    delete_files_in_folder("static/data/output")



# 6a24e6b5-d1f3-43a7-a490-8d17388a77f0