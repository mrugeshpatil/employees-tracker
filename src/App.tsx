import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store/store";
import { fetchEmployeeAbsences } from "./api/employee-absences-data";
import EmployeeTable from "./components/core/employee-absences-table";
import Container from "./components/styled-components/container";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { employeeAbsenceData, loading, error } = useSelector(
    (state: RootState) => state.employee
  );

  // Table header
  const headerData = [
    {
      key: 'id',
      label: 'ID'
    },
    {
      key: 'startDate',
      label: 'Start date'
    },
    {
      key: 'employee.firstName',
      label: 'Name'
    },
    {
      key: 'approved',
      label: 'Approval'
    },
    {
      key: 'absenceType',
      label: 'Absence Type'
    }
  ]

  useEffect(() => {
    dispatch(fetchEmployeeAbsences());
  }, [dispatch]);

  return (
    <Container>
      <h1>Employee absences tracker</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <EmployeeTable
        theadData={headerData}
        employeeAbsenceData={employeeAbsenceData}
      />
    </Container>
  );
}

export default App;
