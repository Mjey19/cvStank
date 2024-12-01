
import InputProps from "@/shared/types/InputProps";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { sendData } from "./send-data";
import { pollForData } from "./poll-for-data";
// import { DataResponse } from "@/shared/types/ResultDataResponse";
import { encode } from "base64-arraybuffer";
import { useDispatch } from "react-redux";
import { resetLoading, updateData } from "../resultBlock/result-slice";
import { DataResponse } from "@/shared/types/ResultDataResponse";
interface FormData {
  [key: string]: any;
}
export default function useForm(inputForm: InputProps[]) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({});
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;
    let dataValue: string | number | File | null;

    if (type === "file" && files && files[0]) {
      const file = files[0];
      const fileName = file.name.split(".");
      const imageId = "." + fileName[fileName.length - 1];
      const binaryData = await file.arrayBuffer();
      const base64Data = encode(binaryData).trim();
      dataValue = base64Data;
      setFormData((prev) => ({
        ...prev,
        photoName: imageId,
        [name]: dataValue,
      }));
    } else {
      dataValue = value || null;
      setFormData((prev) => ({
        ...prev,
        [name]: dataValue,
      }));
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    dispatch(resetLoading());

    inputForm.forEach((item) => {
      if (formData[item.inputName]) {
        data.append(item.inputName, formData[item.inputName]);
      }
    });

    
    const uid = uuidv4();
    data.append("uid", uid);
    data.append("photo_name", uid + formData.photoName);
    const id:any = uid;

    const object: { [key: string]: any } = {};
    data.forEach((value, key) => (object[key] = value));
    const jsonData = JSON.stringify(object);
    await sendData(jsonData);
    const result = await pollForData(id);

    const resultWithLoading: DataResponse = {
      ...result,
      isLoading: false,
    };

    dispatch(updateData(resultWithLoading));
  };

  return { handleChange, handleSubmit };
}
