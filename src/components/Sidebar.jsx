import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

// Role-based navigation structure
const getNavigationItems = (userRole) => {
  const baseItems = [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/incoming-files', label: 'Incoming', icon: '📥' },
    { to: '/received-files', label: 'Received', icon: '📦' },
    { to: '/sent-files', label: 'Sent', icon: '📤' },
    { to: '/create', label: 'Create File', icon: '➕' },
    { to: '/logs', label: 'Logs', icon: '📋' },
    { to: '/track', label: 'Track', icon: '🔍' },
  ];

  const adminItems = [
    { to: '/all-files', label: 'All Files', icon: '🗃' },
    { to: '/department-files', label: 'Dept Files', icon: '🗂' },
    { to: '/user-management', label: 'Users', icon: '👥' },
    { to: '/employee-directory', label: 'Directory', icon: '📒' },
  ];

  const userItems = [
    { to: '/my-files', label: 'My Files', icon: '📄' },
  ];

  const auditorItems = [
    { to: '/audit-log', label: 'Audit Log', icon: '📝' },
  ];

  const commonItems = [
    { to: '/notifications', label: 'Notifications', icon: '🔔' },
    { to: '/my-profile', label: 'Profile', icon: '👤' },
    { to: '/settings', label: 'Settings', icon: '⚙' },
  ];

  let items = [...baseItems];

  // Add role-specific items
  if (userRole === 'superadmin' || userRole === 'admin') {
    items = [...items, ...adminItems];
  }

  if (userRole === 'user') {
    items = [...items, ...userItems];
  }

  if (userRole === 'auditor') {
    items = [...items, ...auditorItems];
  }

  // Add common items
  items = [...items, ...commonItems];

  return items;
};

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, loginAs, logout } = useAuth();

  const navigationItems = getNavigationItems(user?.role || 'user');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      {/* User Profile */}
      <div className="sidebar-header">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <div className="user-name">{user?.name || 'User'}</div>
            <div className="user-role">{user?.role || 'User'}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-item${isActive ? ' active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button className="btn btn-danger w-100" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
