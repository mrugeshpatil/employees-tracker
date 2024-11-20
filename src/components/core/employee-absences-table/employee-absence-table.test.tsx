import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store/store';
import EmployeeTable from './index';
import { EmployeeType } from '../../../interfaces/employee-types';

//const mockTheadData = ['Start date', 'End date', 'Employee name', 'Approval', 'Employee Absence Type'];
const mockTheadData =  [
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
const mockEmployeeAbsenceData: EmployeeType[] = [
  {
    employee: { firstName: 'John', lastName: 'Doe' },
    startDate: '2023-01-01',
    absenceType: 'Sick Leave',
    approved: true,
    id: 1,
    asc: '',
    desc: '',
    initial: '',
    days: 5
  }
];

describe('EmployeeTable', () => {
  test('renders table headers correctly', () => {
    render(
      <Provider store={store}>
        <EmployeeTable theadData={mockTheadData} employeeAbsenceData={mockEmployeeAbsenceData} />
      </Provider>
    );

    mockTheadData.forEach((header) => {
      expect(screen.getByText(header.label)).toBeInTheDocument();
    });

  });

  test('renders employee data correctly', () => {
    render(
      <Provider store={store}>
        <EmployeeTable theadData={mockTheadData} employeeAbsenceData={mockEmployeeAbsenceData} />
      </Provider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Sick Leave')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  test('opens modal with employee absence details on click', () => {
    render(
      <Provider store={store}>
        <EmployeeTable theadData={mockTheadData} employeeAbsenceData={mockEmployeeAbsenceData} />
      </Provider>
    );

    fireEvent.click(screen.getByText('John Doe'));
    expect(screen.getByText('Employee absences record for John Doe')).toBeInTheDocument();
  });

  test('closes modal on clicking close button', () => {
    render(
      <Provider store={store}>
        <EmployeeTable theadData={mockTheadData} employeeAbsenceData={mockEmployeeAbsenceData} />
      </Provider>
    );

    fireEvent.click(screen.getByText('John Doe'));
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Employee absences record for John Doe')).not.toBeInTheDocument();
  });
});
