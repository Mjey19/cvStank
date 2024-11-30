import { checkDataReady } from "./check-data-ready";
import { DataResponse } from "@/shared/types/ResultDataResponse";

export const pollForData = async (
  id: string,
  retries = 10,
  delay = 2000
): Promise<DataResponse> => {
  try {
    const response:any = await checkDataReady(id);
    if (response && response.status == 200) {
      return response.data;
    }

    if (retries > 0) {
      console.log("Data not ready yet, retrying...");
      await new Promise((resolve) => setTimeout(resolve, delay));
      return pollForData(id, retries - 1, delay);
    }

    throw new Error("Data not ready after several attempts");
  } catch (error) {
    console.error("Error during polling:", error);
    throw error;
  }
};
