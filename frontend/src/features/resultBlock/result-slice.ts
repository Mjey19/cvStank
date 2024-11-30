import { DataResponse } from "@/shared/types/ResultDataResponse";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// interface ResultState {
//   time: number;
//   imageUrl: string;
//   area: number;
//   consumption: number;
// }

const initialState: DataResponse & { isLoading: boolean } = {
  time: 0,
  imageUrl: "",
  area: 0,
  consumption: 0,
  money: 0,
  isLoading: true,
};

export const resultSlice = createSlice({
  name: "resultData",
  initialState,
  reducers: {
    resetLoading: () => initialState,
    updateData: (state, action: PayloadAction<DataResponse>) => {
      const { area, consumption, imageUrl, time, isLoading } = action.payload;

      state.area = area;
      state.consumption = consumption;
      state.imageUrl = imageUrl;
      state.time = time;

      state.isLoading = isLoading;
    },
  },
});

export const { updateData, resetLoading } = resultSlice.actions;

export default resultSlice.reducer;
