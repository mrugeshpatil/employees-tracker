import { fetchEmployeeAbsences } from "./employee-absences-data";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Mock Axios
jest.mock("axios");

describe("fetchEmployeeAbsences thunk", () => {
  it("should dispatch appropriate action on successful api call", async () => {
    // Mock API response
    const mockData = [
      { id: 1, employeeName: "Alexi Schramm", absenceType: "ANNUAL_LEAVE" },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const slice = createSlice({
      name: "employee",
      initialState: { absences: [], status: "idle" },
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(fetchEmployeeAbsences.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchEmployeeAbsences.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.absences = action.payload;
          })
          .addCase(fetchEmployeeAbsences.rejected, (state) => {
            state.status = "failed";
          });
      },
    });

    const store = configureStore({
      reducer: slice.reducer,
    });

    // Dispatch
    await store.dispatch(fetchEmployeeAbsences());

    // Assert final state
    const state = store.getState();
    expect(state.status).toBe("succeeded");
    expect(state.absences).toEqual(mockData);
  });

  it("dispatches rejected action when API call fails", async () => {
    // Mock an error response
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    const slice = createSlice({
      name: "employee",
      initialState: { absences: [], status: "idle" },
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(fetchEmployeeAbsences.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchEmployeeAbsences.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.absences = action.payload;
          })
          .addCase(fetchEmployeeAbsences.rejected, (state) => {
            state.status = "failed";
          });
      },
    });

    const store = configureStore({
      reducer: slice.reducer,
    });

    // Dispatch
    await store.dispatch(fetchEmployeeAbsences());

    // Assert final state
    const state = store.getState();
    expect(state.status).toBe("failed");
    expect(state.absences).toEqual([]);
  });
});
