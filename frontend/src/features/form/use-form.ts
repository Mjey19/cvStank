import InputProps from "@/shared/types/InputProps";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { sendData } from "./send-data";
import { pollForData } from "./poll-for-data";
import { DataResponse } from "@/shared/types/ResultDataResponse";
import { encode } from "base64-arraybuffer";
interface FormData {
  [key: string]: any;
}
export default function useForm(inputForm: InputProps[]) {
  const [formData, setFormData] = useState<FormData>({});
  const [resultData, setResultData] = useState<DataResponse>();
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;
    let dataValue: string | number | File | null;
    const uuid = uuidv4();

    if (type === "file" && files) {
      const file = files[0];
      const fileName = file.name.split(".");
      const imageId = uuid + "." + fileName[fileName.length - 1];
      const binaryData = await file.arrayBuffer();
      const base64Data = encode(binaryData).trim();
      dataValue = base64Data;
      setFormData((prev) => ({
        ...prev,
        photoName: imageId,
        uid: uuid,
        [name]: dataValue,
      }));
    } else if (type === "number") {
      dataValue = value ? Number(value) : null;
      setFormData((prev) => ({
        ...prev,
        [name]: dataValue,
        uid: uuid,
      }));
    } else {
      dataValue = value || null;
      setFormData((prev) => ({
        ...prev,
        [name]: dataValue,
        uid: uuid,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    inputForm.forEach((item) => {
      if (formData[item.inputName]) {
        data.append(item.inputName, formData[item.inputName]);
      }
    });

    if (formData.uid && formData.photoName) {
      data.append("uid", formData.uid);
      data.append("photo_name", formData.photoName);
    }
    const id = data.get("uid");

    if (id instanceof File) {
      throw new Error("Expected 'uid' to be a string, but got a File .");
    }
    const object: { [key: string]: any } = {};
    data.forEach((value, key) => (object[key] = value));
    const jsonData = JSON.stringify(object);

    await sendData(jsonData);
    const result = await pollForData(id);
    // console.log(result);

    setResultData(result);
    
  };

  return { handleChange, handleSubmit, resultData };
}
