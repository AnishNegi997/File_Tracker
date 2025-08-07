import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAllFiles } from '../services/dataServices';

export default function ReceivedFiles() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Use global mock data and filter for received files
  const allFiles = getAllFiles();
  let received = [];
  if (user?.role === 'user') {
    received = allFiles.filter(f => (f.status === 'Received' || f.status === 'received') && (f.assignedTo === user.name || f.currentHolder === user.name));
  } else if (user?.role === 'admin') {
    received = allFiles.filter(f => (f.status === 'Received' || f.status === 'received') && (f.department === user.department));
  } else if (user?.role === 'superadmin') {
    received = allFiles.filter(f => f.status === 'Received' || f.status === 'received');
  }

  const handleSendForward = (file) => {
    // Navigate to the comprehensive send/forward page
    navigate('/send-forward', { 
      state: { 
        file: {
          code: file.code || file.fileId,
          title: file.title,
          department: file.department,
          status: file.status,
          priority: file.priority,
          type: file.type || 'Physical',
          currentHolder: file.assignedTo || file.currentHolder
        }
      } 
    });
  };

  const handleRowClick = (file) => {
    navigate('/file-details', { state: { file } });
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="h3 mb-4 fw-bold">Received Files</h1>
      <div className="card shadow-sm p-4 table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>File ID</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>Department</th>
              <th>Status</th>
              <th>Last Action</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {received.length === 0 ? (
              <tr><td colSpan={8} className="text-center text-secondary">No received files.</td></tr>
            ) : (
              received.map(file => (
                <tr key={file.id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(file)}>
                  <td>{file.code || file.fileId}</td>
                  <td>{file.title}</td>
                  <td>{file.priority}</td>
                  <td>{file.assignedTo || file.currentHolder}</td>
                  <td>{file.department}</td>
                  <td>{file.status}</td>
                  <td>{file.lastAction || file.remarks}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <button 
                      className="btn btn-sm btn-outline-primary" 
                      onClick={() => handleSendForward(file)} 
                      title="Send/Forward file" 
                      aria-label="Send file"
                    >
                      📤 Send/Forward
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
