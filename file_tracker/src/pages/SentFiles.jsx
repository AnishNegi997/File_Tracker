import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getFileForwards, getAllFiles, formatDeadline, isFileOverdue } from '../services/dataService';

export default function SentFiles() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sentFiles, setSentFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const allForwards = getFileForwards();
    const userSentFiles = allForwards.filter(forward => forward.sentBy === user?.name);
    setSentFiles(userSentFiles);
  }, [user?.name]);

  const filteredFiles = sentFiles.filter(file =>
    file.fileId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.recipientDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getAllFiles().find(f => f.code === file.fileId)?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewFileDetails = (file) => {
    const fileData = getAllFiles().find(f => f.code === file.fileId);
    if (fileData) {
      navigate('/file-details', { state: { file: fileData } });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'In Transit': return 'warning';
      case 'Returned': return 'secondary';
      default: return 'primary';
    }
  };

  const getDeadlineColor = (deadline) => {
    if (!deadline) return 'secondary';
    
    if (isFileOverdue(deadline)) {
      return 'danger';
    }
    
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diff = deadlineDate - now;
    const hoursRemaining = diff / (1000 * 60 * 60);
    
    if (hoursRemaining < 24) {
      return 'warning';
    } else if (hoursRemaining < 72) {
      return 'primary';
    } else {
      return 'success';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header sticky-header">
        <h1 className="page-title">Sent Files</h1>
        <p className="page-subtitle">Files you have sent to other departments</p>
      </div>

      {/* Search */}
      <div className="content-card sticky-search">
        <div className="content-card-body">
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-6 d-flex align-items-center">
              <span className="text-muted fs-sm">
                {filteredFiles.length} of {sentFiles.length} files
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="content-card">
        <div className="content-card-header">
          <h3 className="card-title">Files Sent by {user?.name}</h3>
        </div>
        <div className="content-card-body p-0 scrollable-files-list">
          {filteredFiles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📤</div>
              <div className="empty-state-title">No sent files found</div>
              <div className="empty-state-text">
                {sentFiles.length === 0 
                  ? "You haven't sent any files yet." 
                  : "No files match your search criteria."
                }
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>File</th>
                    <th>Sent To</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file) => {
                    const deadlineInfo = formatDeadline(file.deadline);
                    return (
                      <tr key={file.id}>
                        <td>
                          <div className="fw-bold">{new Date(file.datetime).toLocaleDateString()}</div>
                          <div className="text-muted fs-xs">
                            {new Date(file.datetime).toLocaleTimeString()}
                          </div>
                        </td>
                        <td>
                          <div className="fw-bold">{file.fileId}</div>
                          <div className="text-muted fs-xs">
                            {getAllFiles().find(f => f.code === file.fileId)?.title || 'Unknown File'}
                          </div>
                        </td>
                        <td>
                          <div className="fw-bold">{file.recipientDepartment}</div>
                          {file.recipientName && (
                            <div className="text-muted fs-xs">Attn: {file.recipientName}</div>
                          )}
                        </td>
                        <td>
                          <span className="badge badge-secondary">{file.sentThrough}</span>
                        </td>
                        <td>
                          <span className={`badge badge-${getStatusColor(file.status)}`}>
                            {file.status}
                          </span>
                        </td>
                        <td>
                          {file.deadline ? (
                            <div>
                              <div className={`fw-bold text-${getDeadlineColor(file.deadline)}`}>
                                {deadlineInfo.fullText}
                              </div>
                              {deadlineInfo.isOverdue && (
                                <div className="text-danger fs-xs">Overdue</div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted">No deadline</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleViewFileDetails(file)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 