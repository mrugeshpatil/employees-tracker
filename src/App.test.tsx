import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import EmployeeTable from "./components/core/employee-absences-table";

test("renders app page title", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Employee absences tracker/i);
  expect(linkElement).toBeInTheDocument();
});
