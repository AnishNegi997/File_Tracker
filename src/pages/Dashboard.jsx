import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const mockFiles = [
  { id: 1, fileId: 'THDC-F-2025-0012', title: 'Purchase Request', assignedTo: 'Alice Johnson', status: 'Received', department: 'HR', lastAction: 'Received 1h ago' },
  { id: 2, fileId: 'THDC-F-2025-0013', title: 'Leave Application', assignedTo: 'Bob Smith', status: 'Sent', department: 'Finance', lastAction: 'Sent to HR 2h ago' },
  { id: 3, fileId: 'THDC-F-2025-0014', title: 'Budget Approval', assignedTo: 'Charlie Brown', status: 'Completed', department: 'IT', lastAction: 'Completed 3h ago' },
  { id: 4, fileId: 'THDC-F-2025-0020', title: 'Policy Update', assignedTo: 'Diana Wilson', status: 'Sent', department: 'Administration', lastAction: 'Sent to Finance 4h ago' },
  { id: 5, fileId: 'THDC-F-2025-0021', title: 'Budget Report', assignedTo: 'Bob Smith', status: 'Received', department: 'Finance', lastAction: 'Received 5h ago' },
];

const departments = ['HR', 'Finance', 'IT', 'Administration', 'Procurement', 'Legal'];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  let files = [];
  let stats = {};
  let departmentStats = {};

  if (user?.role === 'superadmin') {
    files = mockFiles;
    stats = {
      total: mockFiles.length,
      received: mockFiles.filter(f => f.status === 'Received').length,
      sent: mockFiles.filter(f => f.status === 'Sent').length,
      completed: mockFiles.filter(f => f.status === 'Completed').length,
    };
    departmentStats = departments.reduce((acc, dep) => {
      acc[dep] = mockFiles.filter(f => f.department === dep).length;
      return acc;
    }, {});
  } else if (user?.role === 'admin') {
    files = mockFiles.filter(f => f.department === user.department);
    stats = {
      total: files.length,
      received: files.filter(f => f.status === 'Received').length,
      sent: files.filter(f => f.status === 'Sent').length,
      completed: files.filter(f => f.status === 'Completed').length,
    };
  } else if (user?.role === 'user') {
    files = mockFiles.filter(f => f.assignedTo === user.name);
    stats = {
      total: files.length,
      received: files.filter(f => f.status === 'Received').length,
      sent: files.filter(f => f.status === 'Sent').length,
      completed: files.filter(f => f.status === 'Completed').length,
    };
  }

  const handleRowClick = (file) => {
    navigate('/file-details', { state: { file } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Received': return 'primary';
      case 'Sent': return 'warning';
      case 'Completed': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-info">
            <h1 className="dashboard-title">
              {user?.role === 'superadmin' ? 'System Dashboard' : 
               user?.role === 'admin' ? `${user?.department} Dashboard` : 
               'Dashboard'}
            </h1>
            <p className="dashboard-subtitle">
              Welcome back, {user?.name}
              {user?.role === 'admin' && ` - ${user?.department} Administrator`}
              {user?.role === 'superadmin' && ' - System Administrator'}
            </p>
          </div>
          <button className="create-file-btn" onClick={() => navigate('/create')}>
            <span className="btn-icon">➕</span>
            <span className="btn-text">Create File</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">📁</div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Files</div>
          </div>
        </div>
        <div className="stat-card stat-card-info">
          <div className="stat-icon">📥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.received}</div>
            <div className="stat-label">Received</div>
          </div>
        </div>
        <div className="stat-card stat-card-warning">
          <div className="stat-icon">📤</div>
          <div className="stat-content">
            <div className="stat-number">{stats.sent}</div>
            <div className="stat-label">Sent</div>
          </div>
        </div>
        <div className="stat-card stat-card-success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
        {user?.role === 'superadmin' && (
          <>
            <div className="stat-card stat-card-secondary">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <div className="stat-number">{departments.length}</div>
                <div className="stat-label">Departments</div>
              </div>
            </div>
            <div className="stat-card stat-card-secondary">
              <div className="stat-icon">🔍</div>
              <div className="stat-content">
                <div className="stat-number">100%</div>
                <div className="stat-label">System Health</div>
              </div>
            </div>
            <div className="stat-card stat-card-secondary">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <div className="stat-number">24</div>
                <div className="stat-label">Active Users</div>
              </div>
            </div>
            <div className="stat-card stat-card-secondary">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <div className="stat-number">45ms</div>
                <div className="stat-label">Response Time</div>
              </div>
            </div>

          </>
        )}
      </div>

      {/* Department Breakdown (Admin and Super Admin) */}
      {(user?.role === 'superadmin' || user?.role === 'admin') && (
        <div className="department-overview">
          <div className="section-header">
            <h3 className="section-title">
              {user?.role === 'superadmin' ? 'Department Overview' : `${user?.department} Department Overview`}
            </h3>
            <div className="section-subtitle">
              {user?.role === 'superadmin' ? 'System-wide file distribution' : 'File distribution across departments'}
            </div>
          </div>
          <div className="department-grid">
            {(user?.role === 'superadmin' ? departments : [user?.department]).map(dep => (
              <div className="department-card" key={dep}>
                <div className="department-icon">🏢</div>
                <div className="department-name">{dep}</div>
                <div className="department-count">{departmentStats[dep] || 0}</div>
                <div className="department-label">files</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* System Insights (Super Admin Only) */}
      {user?.role === 'superadmin' && (
        <div className="system-insights">
          <div className="section-header">
            <h3 className="section-title">System Insights</h3>
            <div className="section-subtitle">Key metrics and system status</div>
          </div>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">📊</div>
              <div className="insight-content">
                <div className="insight-title">Active Users</div>
                <div className="insight-value">24</div>
                <div className="insight-description">Currently online</div>
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-icon">⚡</div>
              <div className="insight-content">
                <div className="insight-title">Response Time</div>
                <div className="insight-value">45ms</div>
                <div className="insight-description">Average load time</div>
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-icon">🛡️</div>
              <div className="insight-content">
                <div className="insight-title">Security</div>
                <div className="insight-value">Secure</div>
                <div className="insight-description">All systems operational</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Files */}
      <div className="recent-files-section">
        <div className="section-header">
          <h3 className="section-title">Recent Files</h3>
          <div className="section-subtitle">Latest file activities and updates</div>
        </div>
        <div className="files-container">
          {files.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <div className="empty-title">No files found</div>
              <div className="empty-text">Start by creating a new file or receiving files from other departments.</div>
            </div>
          ) : (
            <div className="files-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>File ID</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Department</th>
                    <th>Last Action</th>
                  </tr>
                </thead>
                <tbody>
                  {files.slice(0, 8).map(file => (
                    <tr key={file.id} onClick={() => handleRowClick(file)} className="file-row">
                      <td className="file-id">{file.fileId}</td>
                      <td className="file-title">{file.title}</td>
                      <td>
                        <span className={`status-badge status-${getStatusColor(file.status)}`}>
                          {file.status}
                        </span>
                      </td>
                      <td className="assigned-to">{file.assignedTo}</td>
                      <td className="department">{file.department}</td>
                      <td className="last-action">{file.lastAction}</td>
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