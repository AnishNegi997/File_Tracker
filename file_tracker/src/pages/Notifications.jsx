import React from 'react';

const mockNotifications = [
  { message: 'File THDC-F-2025-0012 has been approved.', time: '2 hours ago' },
  { message: 'New file assigned to you.', time: '1 day ago' },
  { message: 'Password changed successfully.', time: '3 days ago' },
];

export default function Notifications() {
  return (
    <div className="container-fluid py-4" style={{ maxWidth: 600 }}>
      <h1 className="h3 mb-4 fw-bold">Notifications</h1>
      <div className="card shadow-sm p-4">
        <ul className="list-group list-group-flush">
          {mockNotifications.map((n, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{n.message}</span>
              <span className="badge bg-secondary rounded-pill">{n.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 