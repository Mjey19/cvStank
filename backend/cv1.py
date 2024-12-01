import cv2 as cv
import sys
import os
import time
import numpy as np
import colorsys as colorsys
import colorutils as cu
import matplotlib.pyplot as plt
from ultralytics import YOLO
import json


delailColours = {'bumper':'#009996',
'fog lights': "#b2bc31", 
'radiator': "#bdbcba", 
'license plate':"#b7d386", 
'emblem': "#e70379",
'hood': "#c9abd3",
'fender': "#dcc3e1",
'windshield': "#9bd8dd",
'roof': "#894f74",
'back fender': "#f8adc0",
'side mirrors':"#eb5c8b",
'door handle':"#94236e",
'tires':"#2c3a69",
'wheel':"#150654",
'back door':"#144432",
'front door':"#008761"
 }

detailNumber = {
    'bumper': [8],
    'fog lights':[4,5,7,12,13,15],
    'side mirrors':[17,19],
    'front door':[11,14,9],
    'back door':[3,6,1],
    'wheel':[22]
}

#   0: back_bumper
#   1: back_door
#   2: back_glass
#   3: back_left_door
#   4: back_left_light
#   5: back_light
#   6: back_right_door
#   7: back_right_light
#   8: front_bumper
#   9: front_door
#   10: front_glass
#   11: front_left_door
#   12: front_left_light
#   13: front_light
#   14: front_right_door
#   15: front_right_light
#   16: hood
#   17: left_mirror
#   18: object
#   19: right_mirror
#   20: tailgate
#   21: trunk
#   22: wheel

filename = 'number.json'
with open(filename, 'r') as file:
    data = json.load(file)
global number
number = data["number"]

detail = 'back door'
uid = '0722439e-ac47-47d8-a269-3a29eb117a74'

def number_update():
    data = {"number":number}
    filename = 'number.json'
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

def detail_detection(class_number,uid):
    best_model = YOLO("runs/segment/train14/weights/best.pt")
    best_model.predict(f'static\images\input\{uid}.jpg', classes = class_number, save = True, name = 'Image_N', show_boxes = False)
    results = best_model(f'static\images\input\{uid}.jpg')
    # Plot and log the results
    fig, ax = plt.subplots(figsize=(12, 8))
    ax.imshow(cv.cvtColor(results[0].plot(), cv.COLOR_BGR2RGB))
    ax.axis("off")
    #plt.show()
    global number
    number += 1
    time.sleep(3)


def etalon(uid):
    doorArea = 10000*0.8
    detail = 'front door'
    filename = 'number.json'
    with open(filename, 'r') as file:
        data = json.load(file)
    global number
    number = data["number"]
    detail_detection(detailNumber.get(detail),uid)
    path = 'static\images\output'
    fn = f'static\images\input\{uid}.jpg'
    fn2 = f'runs\segment\Image_N{number}\{uid}.jpg'
    print(number)
    img = cv.imread(fn2)
    img2 = cv.imread(fn)
    hsv = cv.cvtColor( img, cv.COLOR_BGR2HSV ) # меняем цветовую модель с BGR на HSV
    c = cu.hex_to_hsv(delailColours.get(detail))
    b = 25
    Hmin = max(c[0]/2-b,0)
    Smin = max(c[1]*255-b,0)
    Vmin = max(c[2]*255-b,0)

    Hmax = min(c[0]/2+b,179)
    Smax = min(c[1]*255+b,255)
    Vmax = min(c[2]*255+b,255)

    hsv_min = np.array((Hmin,Smin,Vmin),np.uint8)
    hsv_max = np.array((Hmax,Smax,Vmax),np.uint8)
    thresh = cv.inRange( hsv, hsv_min, hsv_max)
    mask = cv.inRange( hsv, hsv_min, hsv_max)

    contours, _ = cv.findContours( thresh.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    print(contours)
    cv.drawContours(img, contours, -1, (0,255,255), 3, cv.LINE_AA, 2)
    
    #Просчет площади
    area = cv.contourArea(contours[0])
    onepix = doorArea/area
    return onepix


def cv1(uid):
    filename = f'static\data\input\{uid}.json'
    with open(filename, 'r') as file:
        data1 = json.load(file)
    detail = data1['detail']

    filename = 'number.json'
    with open(filename, 'r') as file:
        data = json.load(file)
    global number
    number = data["number"]

    onepix = etalon(uid)
    detail_detection(detailNumber.get(detail),uid)
    #print(__doc__)
    path = 'static\images\output'
    fn = f'static\images\input\{uid}.jpg'
    fn2 = f'runs\segment\Image_N{number}\{uid}.jpg'
    img = cv.imread(fn2)
    img2 = cv.imread(fn)
    hsv = cv.cvtColor( img, cv.COLOR_BGR2HSV ) # меняем цветовую модель с BGR на HSV
    c = cu.hex_to_hsv(delailColours.get(detail))
    print(c)
    b = 25
    Hmin = max(c[0]/2-b,0)
    Smin = max(c[1]*255-b,0)
    Vmin = max(c[2]*255-b,0)

    Hmax = min(c[0]/2+b,179)
    Smax = min(c[1]*255+b,255)
    Vmax = min(c[2]*255+b,255)

    hsv_min = np.array((Hmin,Smin,Vmin),np.uint8)
    hsv_max = np.array((Hmax,Smax,Vmax),np.uint8)
    thresh = cv.inRange( hsv, hsv_min, hsv_max)
    mask = cv.inRange( hsv, hsv_min, hsv_max)

    contours, _ = cv.findContours( thresh.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    print(contours)
    cv.drawContours(img, contours, -1, (0,255,255), 3, cv.LINE_AA, 2)
    
    #Просчет площади
    area = cv.contourArea(contours[0])
    aream = onepix * area / 10000

    img = cv.bitwise_and(img,img,mask = mask)
    imgr = cv.resize(img, dsize=(960, 540),fx=20, fy=20)
    imgr2 = cv.resize(img2, dsize=(960, 540),fx=20, fy=20)
    imgr0 = cv.addWeighted(imgr,0.7,imgr2,0.3,0)
    #cv.imshow('contours', imgr0) # выводим итоговое изображение в окно
    cv.imwrite(os.path.join(path , f'{uid}.jpg'), imgr0)
    cv.waitKey()
    cv.destroyAllWindows()

    number_update()
    
    dct = {
    "area": round(aream,2), 
    "consumption": round(aream*float(data1['slice'])/float(data1['consumption']),2), 
    "time": round(aream*float(data1['slice'])/float(data1['complexity']),2), 
    "money": round(aream*float(data1['slice'])*float(data1['timePrice'])/float(data1['complexity']))
    }
    
    dct["imageUrl"] = f"http://127.0.0.1:5000/static/images/output/{uid}.jpg"
    with open(f'static/data/output/{uid}.json', "w") as file:
        json.dump(dct, file)



