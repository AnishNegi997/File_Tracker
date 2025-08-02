import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getFilesByAssignee, getFilesByCreator } from '../services/dataServices';

export default function MyFiles() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [sortBy, setSortBy] = useState('createdAtDesc');
  const [viewMode, setViewMode] = useState('created'); // 'created' or 'assigned'

  useEffect(() => {
    if (user?.name) {
      // Get files created by the user
      const createdFiles = getFilesByCreator(user.name);
      // Get files assigned to the user
      const assignedFiles = getFilesByAssignee(user.name);
      
      // Combine and deduplicate files
      const allFiles = [...createdFiles, ...assignedFiles];
      const uniqueFiles = allFiles.filter((file, index, self) => 
        index === self.findIndex(f => f.id === file.id)
      );
      
      setFiles(uniqueFiles);
    }
  }, [user?.name]);

  // Sorting logic
  const sortedFiles = [...files].sort((a, b) => {
    if (sortBy === 'createdAtAsc') {
      return new Date(a.datetime) - new Date(b.datetime);
    } else if (sortBy === 'createdAtDesc') {
      return new Date(b.datetime) - new Date(a.datetime);
    } else if (sortBy === 'importance') {
      // Emergency first, then Critical, Important, Routine
      const importanceOrder = { 'Emergency': 4, 'Critical': 3, 'Important': 2, 'Routine': 1 };
      return importanceOrder[b.priority] - importanceOrder[a.priority];
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Filter files based on view mode
  const filteredFiles = viewMode === 'created' 
    ? sortedFiles.filter(f => f.createdBy === user?.name)
    : sortedFiles.filter(f => f.currentHolder === user?.name || f.requisitioner === user?.name);

  if (!user || user.role !== 'user') {
    return (
      <div className="content-card">
        <div className="content-card-body">
          <div className="alert alert-danger">Access denied.</div>
        </div>
      </div>
    );
  }

  const handleSendForward = (file) => {
    navigate('/send-forward', { 
      state: { 
        file: {
          code: file.code,
          title: file.title,
          department: file.department,
          status: file.status,
          priority: file.priority,
          type: file.type,
          currentHolder: file.currentHolder
        }
      } 
    });
  };

  const handleRowClick = (file) => {
    navigate('/file-details', { state: { file } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Created': return 'primary';
      case 'Received': return 'success';
      case 'On Hold': return 'warning';
      case 'Released': return 'info';
      case 'Complete': return 'success';
      default: return 'secondary';
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'Routine': return 'secondary';
      case 'Important': return 'primary';
      case 'Critical': return 'warning';
      case 'Emergency': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">My Files</h1>
        <p className="page-subtitle">Files you've created or are assigned to you</p>
      </div>

      {/* Filters and Controls */}
      <div className="content-card mb-6">
        <div className="content-card-body">
          <div className="row">
            <div className="col-6">
              <label className="form-label">View</label>
              <select 
                className="form-select" 
                value={viewMode} 
                onChange={e => setViewMode(e.target.value)}
              >
                <option value="created">Files I Created</option>
                <option value="assigned">Files Assigned to Me</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label">Sort By</label>
              <select 
                className="form-select" 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="createdAtDesc">Newest First</option>
                <option value="createdAtAsc">Oldest First</option>
                <option value="importance">Importance Level</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="content-card">
        <div className="content-card-header">
          <h3 className="card-title">
            {viewMode === 'created' ? 'Files I Created' : 'Files Assigned to Me'} 
            ({filteredFiles.length})
          </h3>
        </div>
        <div className="content-card-body p-0">
          {filteredFiles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📄</div>
              <div className="empty-state-title">No files found</div>
              <div className="empty-state-text">
                {viewMode === 'created' 
                  ? "You haven't created any files yet. Start by creating a new file."
                  : "No files are currently assigned to you."
                }
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>File ID</th>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Importance</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map(file => (
                    <tr key={file.id} onClick={() => handleRowClick(file)} style={{ cursor: 'pointer' }}>
                      <td className="fw-bold">{file.code}</td>
                      <td>{file.title}</td>
                      <td>{file.department}</td>
                      <td>
                        <span className={`badge badge-${getImportanceColor(file.priority)}`}>
                          {file.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${getStatusColor(file.status)}`}>
                          {file.status}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-secondary">{file.type}</span>
                      </td>
                      <td>
                        <div className="fw-bold">{new Date(file.datetime).toLocaleDateString()}</div>
                        <div className="text-muted fs-xs">
                          {new Date(file.datetime).toLocaleTimeString()}
                        </div>
                      </td>
                      <td onClick={e => e.stopPropagation()}>
                        <button 
                          className="btn btn-sm btn-primary" 
                          onClick={() => handleSendForward(file)} 
                          title="Send/Forward file"
                        >
                          📤 Send
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 