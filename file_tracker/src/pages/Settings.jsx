import React, { useState, useRef } from 'react';

export default function Settings() {
  const [email, setEmail] = useState('john.smith@office.com');
  const [name, setName] = useState('John Smith');
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySMS, setNotifySMS] = useState(false);
  const [notifyInApp, setNotifyInApp] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const fileInputRef = useRef();

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleNotificationsSave = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
  };

  const handleDeleteAccount = () => {
    setShowDelete(false);
    alert('Account deleted! (mock)');
    // TODO: Add real delete logic
  };

  return (
    <div className="container-fluid py-4" style={{ maxWidth: 700 }}>
      <h1 className="h3 mb-4 fw-bold">Settings</h1>
      {success && (
        <div className="alert alert-success" role="alert">
          Settings saved successfully!
        </div>
      )}
      <div className="row g-4">
        {/* Profile Section */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="mb-3">User Profile</h5>
            <div className="d-flex align-items-center mb-3">
              <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center me-3 position-relative" style={{ width: 60, height: 60, fontSize: 32, color: '#fff', overflow: 'hidden' }}>
                {avatar ? (
                  <img src={avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  '👤'
                )}
                <button
                  type="button"
                  className="btn btn-sm btn-light position-absolute bottom-0 end-0 p-1 border"
                  style={{ fontSize: 12 }}
                  onClick={() => fileInputRef.current.click()}
                  title="Upload Avatar"
                >
                  <span role="img" aria-label="upload">📷</span>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
              </div>
              <div>
                <div className="fw-bold">{name}</div>
                <div className="text-secondary small">{email}</div>
              </div>
            </div>
            <form onSubmit={handleProfileSave}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Save Profile</button>
            </form>
          </div>
        </div>
        {/* Change Password Section */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="mb-3">Change Password</h5>
            <form onSubmit={handlePasswordSave}>
              <div className="mb-3">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Change Password</button>
            </form>
          </div>
        </div>
      </div>
      {/* Notification Preferences Section */}
      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3">Notification Preferences</h5>
        <form onSubmit={handleNotificationsSave}>
          <div className="form-check form-switch mb-2">
            <input className="form-check-input" type="checkbox" id="notifyEmail" checked={notifyEmail} onChange={e => setNotifyEmail(e.target.checked)} />
            <label className="form-check-label" htmlFor="notifyEmail">Email Notifications</label>
          </div>
          <div className="form-check form-switch mb-2">
            <input className="form-check-input" type="checkbox" id="notifySMS" checked={notifySMS} onChange={e => setNotifySMS(e.target.checked)} />
            <label className="form-check-label" htmlFor="notifySMS">SMS Notifications</label>
          </div>
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="notifyInApp" checked={notifyInApp} onChange={e => setNotifyInApp(e.target.checked)} />
            <label className="form-check-label" htmlFor="notifyInApp">In-App Notifications</label>
          </div>
          <button type="submit" className="btn btn-primary">Save Preferences</button>
        </form>
      </div>
      {/* Dark Mode & Delete Account */}
      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3">Other Settings</h5>
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="darkMode" checked={darkMode} onChange={handleDarkModeToggle} />
          <label className="form-check-label" htmlFor="darkMode">Dark Mode</label>
        </div>
        <button className="btn btn-outline-danger" onClick={() => setShowDelete(true)}>Delete Account</button>
        {/* Delete confirmation modal */}
        {showDelete && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDelete(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowDelete(false)}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={handleDeleteAccount}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 