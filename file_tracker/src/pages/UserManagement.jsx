import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const departments = ['HR', 'Finance', 'IT', 'Administration', 'Procurement', 'Legal'];
const roles = ['user', 'admin'];

// Initial mock users (should be synced with AuthContext for real app)
const initialUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@company.com', department: 'HR', role: 'user' },
  { id: 2, name: 'Bob Smith', email: 'bob@company.com', department: 'Finance', role: 'user' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@company.com', department: 'IT', role: 'user' },
  { id: 4, name: 'Diana Wilson', email: 'diana@company.com', department: 'Administration', role: 'admin' },
  { id: 5, name: 'Super Admin', email: 'super@admin.com', department: 'All', role: 'superadmin' },
];

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', department: departments[0], role: 'user' });

  // Filter users based on role
  const visibleUsers = user?.role === 'superadmin'
    ? users.filter(u => u.role !== 'superadmin')
    : users.filter(u => u.department === user.department && u.role !== 'superadmin');

  const handleOpenAdd = () => {
    setEditUser(null);
    setForm({ name: '', email: '', department: user.role === 'admin' ? user.department : departments[0], role: 'user' });
    setShowModal(true);
  };

  const handleOpenEdit = (u) => {
    setEditUser(u);
    setForm({ name: u.name, email: u.email, department: u.department, role: u.role });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUser) {
      setUsers(users.map(u => u.id === editUser.id ? { ...editUser, ...form } : u));
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 fw-bold">User Management</h1>
        <button className="btn btn-primary" onClick={handleOpenAdd}>Add Employee</button>
      </div>
      <div className="card shadow-sm p-4 table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers.length === 0 ? (
              <tr><td colSpan={5} className="text-center text-secondary">No employees found.</td></tr>
            ) : (
              visibleUsers.map(u => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.department}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-info me-2" onClick={() => handleOpenEdit(u)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{editUser ? 'Edit Employee' : 'Add Employee'}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select className="form-select" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} required disabled={user.role === 'admin'}>
                      {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select className="form-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required>
                      {roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editUser ? 'Save Changes' : 'Add Employee'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 