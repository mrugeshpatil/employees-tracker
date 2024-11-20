import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEmployeeAbsences } from "../../api/employee-absences-data";
import { EmployeeType, initialState } from "../../interfaces/employee-types";

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeAbsences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployeeAbsences.fulfilled,
        (state, action: PayloadAction<EmployeeType[]>) => {
          state.loading = false;
          state.employeeAbsenceData = action.payload;
        }
      )
      .addCase(fetchEmployeeAbsences.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch employee absences";
      });
  },
});

export default employeeSlice.reducer;
