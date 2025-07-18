import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const mockEmployees = [
  { name: 'Super Admin', email: 'super@admin.com', department: 'All', contact: '123-456-7890' },
  { name: 'IT Admin', email: 'it@company.com', department: 'IT', contact: '123-456-7891' },
  { name: 'HR Admin', email: 'hr@company.com', department: 'HR', contact: '123-456-7892' },
  { name: 'Regular User', email: 'user@company.com', department: 'IT', contact: '123-456-7893' },
  { name: 'Auditor', email: 'auditor@company.com', department: 'All', contact: '123-456-7894' },
];

export default function EmployeeDirectory() {
  const { user } = useAuth();
  if (!(user?.role === 'superadmin' || user?.role === 'admin')) return <div className="container py-4"><div className="alert alert-danger">Access denied.</div></div>;

  return (
    <div className="container-fluid py-4">
      <h1 className="h3 mb-4 fw-bold">Employee Directory</h1>
      <div className="card shadow-sm p-4">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {mockEmployees.map((emp, idx) => (
              <tr key={idx}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 