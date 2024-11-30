import axios from "axios";
// import env from "react-dotenv";

export const sendData = async (data: any) => {
  try {
    await axios.post("http://127.0.0.1:5000/api/postdata", data,{
      headers: {
        'Content-Type': 'application/json', 
      },
    });
  } catch (error) {
    console.error("Error during POST request:", error);
  }
};
