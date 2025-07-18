import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const mockFiles = [
  { id: 1, fileId: 'THDC-F-2025-0012', title: 'Purchase Request', assignedTo: 'Alice Johnson', status: 'Received', department: 'HR', sentBy: '', sentTo: '', history: [] },
  { id: 2, fileId: 'THDC-F-2025-0013', title: 'Leave Application', assignedTo: 'Bob Smith', status: 'Received', department: 'Finance', sentBy: '', sentTo: '', history: [] },
  { id: 3, fileId: 'THDC-F-2025-0014', title: 'Budget Approval', assignedTo: 'Charlie Brown', status: 'Received', department: 'IT', sentBy: '', sentTo: '', history: [] },
  { id: 4, fileId: 'THDC-F-2025-0020', title: 'Policy Update', assignedTo: 'Diana Wilson', status: 'Sent', department: 'Administration', sentBy: 'Alice Johnson', sentTo: 'Finance', history: [] },
  { id: 5, fileId: 'THDC-F-2025-0021', title: 'Budget Report', assignedTo: 'Bob Smith', status: 'Sent', department: 'Finance', sentBy: 'Diana Wilson', sentTo: 'HR', history: [] },
];

const departments = ['HR', 'Finance', 'IT', 'Administration', 'Procurement', 'Legal'];

export default function AllFiles() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deptFilter, setDeptFilter] = useState(departments[0]);

  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return <div className="container py-4"><div className="alert alert-danger">Access denied.</div></div>;
  }

  let files = [];
  if (user.role === 'superadmin') {
    files = mockFiles.filter(f => f.department === deptFilter);
  } else if (user.role === 'admin') {
    files = mockFiles.filter(f => f.department === user.department);
  }

  const handleRowClick = (file) => {
    navigate('/file-details', { state: { file } });
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center mb-3">
        <h1 className="h3 fw-bold mb-0">All Files</h1>
        {user.role === 'superadmin' && (
          <select className="form-select ms-3" style={{ width: 200 }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
          </select>
        )}
      </div>
      <div className="card shadow-sm p-4 table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>File ID</th>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Department</th>
              <th>Status</th>
              <th>Sent By</th>
              <th>Sent To</th>
            </tr>
          </thead>
          <tbody>
            {files.length === 0 ? (
              <tr><td colSpan={7} className="text-center text-secondary">No files found.</td></tr>
            ) : (
              files.map(file => (
                <tr key={file.id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(file)}>
                  <td>{file.fileId}</td>
                  <td>{file.title}</td>
                  <td>{file.assignedTo}</td>
                  <td>{file.department}</td>
                  <td>{file.status}</td>
                  <td>{file.sentBy}</td>
                  <td>{file.sentTo}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 