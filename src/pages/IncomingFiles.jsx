import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAllFiles } from '../services/dataServices';

export default function IncomingFiles() {
  const { user } = useAuth();
  const [acceptingFile, setAcceptingFile] = useState(null);
  const [acceptRemarks, setAcceptRemarks] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Use global mock data and filter for incoming files
  const allFiles = getAllFiles();
  let incoming = [];
  if (user?.role === 'user') {
    incoming = allFiles.filter(f => (f.status === 'Received' || f.status === 'incoming') && (f.sentTo === user.name || f.currentHolder === user.name));
  } else if (user?.role === 'admin') {
    incoming = allFiles.filter(f => (f.status === 'Received' || f.status === 'incoming') && (f.sentTo === user.department || f.department === user.department));
  } else if (user?.role === 'superadmin') {
    incoming = allFiles.filter(f => f.status === 'Received' || f.status === 'incoming');
  }

  const handleAccept = (fileId) => {
    // Accept logic can be implemented here if needed
    setAcceptingFile(null);
    setAcceptRemarks('');
    setSuccessMsg('File accepted and moved to Received Files.');
    setTimeout(() => setSuccessMsg(''), 2000);
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="h3 mb-4 fw-bold">Incoming Files</h1>
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      <div className="card shadow-sm p-4 table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>File ID</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Sent By</th>
              <th>Sent To</th>
              <th>Department</th>
              <th>Last Action</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incoming.length === 0 ? (
              <tr><td colSpan={8} className="text-center text-secondary">No incoming files.</td></tr>
            ) : (
              incoming.map(file => (
                <tr key={file.id}>
                  <td>{file.code || file.fileId}</td>
                  <td>{file.title}</td>
                  <td>{file.priority}</td>
                  <td>{file.sentBy || file.createdBy}</td>
                  <td>{file.sentTo || file.currentHolder}</td>
                  <td>{file.department}</td>
                  <td>{file.lastAction || file.remarks}</td>
                  <td>
                    {(user?.role === 'user' || user?.role === 'admin' || user?.role === 'superadmin') ? (
                      <button className="btn btn-sm btn-success" onClick={() => setAcceptingFile(file)}>Accept</button>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Accept Modal */}
        {acceptingFile && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Accept File</h5>
                  <button type="button" className="btn-close" onClick={() => setAcceptingFile(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Remarks <span className="text-danger">*</span></label>
                    <textarea className="form-control" value={acceptRemarks} onChange={e => setAcceptRemarks(e.target.value)} placeholder="Enter remarks for acceptance" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setAcceptingFile(null)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={() => handleAccept(acceptingFile.id)} disabled={!acceptRemarks.trim()}>Accept</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 