import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployeeAbsences = createAsyncThunk(
  "employee/fetchEmployeeAbsences",
  async () => {
    const response = await axios.get(
      "https://front-end-kata.brighthr.workers.dev/api/absences"
    );
    console.log('DATA >>> ', response.data)
    return response.data;
  }
);
