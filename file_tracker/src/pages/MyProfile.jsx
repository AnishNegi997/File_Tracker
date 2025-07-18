import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function MyProfile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [contact, setContact] = useState('123-456-7890');
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="container-fluid py-4" style={{ maxWidth: 600 }}>
      <h1 className="h3 mb-4 fw-bold">My Profile</h1>
      {success && <div className="alert alert-success">Profile updated!</div>}
      <div className="card shadow-sm p-4">
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input type="text" className="form-control" value={department} onChange={e => setDepartment(e.target.value)} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input type="text" className="form-control" value={contact} onChange={e => setContact(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
} 