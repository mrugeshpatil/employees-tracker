
export interface EmployeeTableHeader {
  key: string
  label: string
}

export interface Employee {
  firstName: string;
  lastName: string;
  id?: string;
}

export interface EmployeeType {
  startDate: string;
  absenceType: string;
  approved: boolean;
  days: number;
  employee: {
    firstName: string;
    lastName: string;
    id?: string;
  };
  id: number;
  asc: string;
  desc: string;
  initial: string;
}

export interface EmployeeState {
  employeeAbsenceData: EmployeeType[];
  loading: boolean;
  error: string | null;
}

export const initialState: EmployeeState = {
  employeeAbsenceData: [],
  loading: false,
  error: null,
};
