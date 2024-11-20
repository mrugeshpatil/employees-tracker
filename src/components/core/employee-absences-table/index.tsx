import React, { useCallback, useEffect, useState } from "react";
import {
  EmployeeTableHeader,
  EmployeeType,
} from "../../../interfaces/employee-types";
import TablePrimary from "../../styled-components/table-primary";
import OverlayModal from "../../styled-components/overlay-modal";
import TableModal from "../../styled-components/table-modal";
import { formatDate } from "../../utils/date-formatter";
import ConflictAbsence from "../../styled-components/conflict-absence";
import SortIcon from "../../styled-components/sort-icon";
import ButtonPrimary from "../../styled-components/button-primary";

type SortConfig = {
  key: keyof EmployeeType | null;
  direction: "asc" | "desc";
};

interface EmployeeTableProps {
  theadData: EmployeeTableHeader[];
  employeeAbsenceData: EmployeeType[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  theadData,
  employeeAbsenceData,
}) => {
  const [employeeAbsences, setEmployeeAbsences] = useState<EmployeeType[]>([]);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [sortData, setSortData] = useState(employeeAbsenceData);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  // show absence employee
  const showAbsences = (employee: string) => {
    console.log("employee ===> , ", employee);
    setSelectedEmployeeName(employee);
    const employeeLeaves = employeeAbsenceData.filter(
      (person) =>
        `${person.employee.firstName} ${person.employee.lastName}` === employee
    );
    setEmployeeAbsences(employeeLeaves);
  };

  // new code sorting
  const handleSortedData = (key: keyof EmployeeType) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...sortData].sort((a, b) => {
      const aValue = key
        .split(".")
        .reduce((acc: any, curr: string) => acc[curr], a);
      const bValue = key
        .split(".")
        .reduce((acc: any, curr: string) => acc[curr], b);

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof EmployeeType) => {
    if (sortConfig.key !== key) return <SortIcon nosort>↑↓</SortIcon>;
    return sortConfig.direction === "asc" ? <SortIcon>↑</SortIcon> : <SortIcon>↓</SortIcon>;
  };

  // Conflict Indicator
  const showConflictIcon = (isApprove: boolean) => {
    if (!isApprove) {
      return <ConflictAbsence title="There is conflict with approval">!</ConflictAbsence>;
    }
  };

  //set inital load data to table from store to local state
  useEffect(() => {
    const dateFormattedEmployeeData = employeeAbsenceData.map((item) => ({
      ...item,
      startDate: formatDate(item.startDate),
    }));

    setSortData(dateFormattedEmployeeData);
  }, [employeeAbsenceData]);

  return (
    <>
      <TablePrimary border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            {theadData.map((thData: any) => (
              <th key={thData.key} onClick={() => handleSortedData(thData.key)}>
                {thData.label} {getSortIndicator(thData.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortData.map((emp: EmployeeType) => {
            const employeeFullName = `${emp.employee.firstName} ${emp.employee.lastName}`;
            return (
              //   <tr key={emp.id} className={emp.approved ? "" : "danger"}>
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td onClick={() => showAbsences(employeeFullName)}>
                  {employeeFullName}
                </td>
                <td>{emp.startDate}</td>
                <td>{emp.approved ? "Approved" : "Pending"}</td>
                <td>
                  {emp.absenceType} {showConflictIcon(emp.approved)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </TablePrimary>
      {selectedEmployeeName && (
        <>
          <TableModal>
            <h2>Employee absences record for {selectedEmployeeName}</h2>
            <ButtonPrimary position="right-top" onClick={() => setSelectedEmployeeName("")}>Close</ButtonPrimary>
            <TablePrimary>
              <thead>
                <tr>
                  <th>Start date</th>
                  <th>Days</th>
                  <th>Absence Type</th>
                </tr>
              </thead>
              <tbody>
                {employeeAbsences.map((emp) => (
                  <tr key={`${emp.employee.id}-${emp.startDate}`}>
                    <td>{emp.startDate}</td>
                    <td>{emp.days}</td>
                    <td>{emp.absenceType}</td>
                  </tr>
                ))}
              </tbody>
            </TablePrimary>
          </TableModal>
          <OverlayModal></OverlayModal>
        </>
      )}
    </>
  );
};

export default EmployeeTable;
