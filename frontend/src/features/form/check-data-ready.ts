import axios from "axios";
// import env from "react-dotenv";

export const checkDataReady = async (id: string) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/getdata/${id}`);
    return response;
  } catch (error) {
    console.error("Error during GET request:", error);
    // throw error;
  }
};
