import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Barcode from '../components/Barcode';
import { getFileForwards } from '../services/dataService';

export default function FileDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file;
  const forwards = file ? getFileForwards(file.code) : [];

  if (!file) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning mb-3">No file selected. Please go back and select a file.</div>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="file-details-page-container">
      {/* Sticky Header */}
      <div className="file-details-header sticky-header">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-secondary me-3 back-btn-spaced" onClick={() => navigate(-1)}>&larr; Back</button>
            <h1 className="h3 fw-bold mb-0">File Details</h1>
          </div>
          <div>
            <button 
              className="btn btn-primary me-2" 
              onClick={() => navigate('/send-forward', { state: { file } })}
            >
              📤 Send/Forward
            </button>
            <button className="btn btn-outline-secondary">Print</button>
          </div>
        </div>
      </div>
      <div className="main-content-with-header">
        <div className="card shadow-sm p-4 mb-4">
          <h5 className="mb-3">Metadata</h5>
          <div className="row mb-3">
            <div className="col-md-6"><b>File ID:</b> {file.fileId}</div>
            <div className="col-md-6"><b>Title:</b> {file.title}</div>
            <div className="col-md-6"><b>Department:</b> {file.department}</div>
            <div className="col-md-6"><b>Status:</b> {file.status}</div>
            <div className="col-md-6"><b>Assigned To:</b> {file.assignedTo}</div>
            <div className="col-md-6"><b>Priority:</b> {file.priority}</div>
            <div className="col-md-6"><b>Created By:</b> {file.createdBy}</div>
            <div className="col-md-6"><b>Created At:</b> {file.createdAt}</div>
          </div>
          <div className="mb-3">
            <b>Barcode:</b>
            <div className="mt-2"><Barcode value={file.fileId} /></div>
          </div>
          <h5 className="mt-4 mb-2">Movement History</h5>
          <ul className="timeline list-unstyled ms-2">
            {file.history && file.history.length > 0 ? file.history.map((item, idx) => (
              <li key={idx} className="mb-3 position-relative ps-5">
                <span className="position-absolute top-0 start-0 translate-middle p-2 bg-primary border border-light rounded-circle shadow-sm" style={{fontSize: 16}}></span>
                <div className="fw-bold mb-1">
                  {item.action} {item.to ? <span>to <b>{item.to}</b></span> : null} {item.by ? <span>by <b>{item.by}</b></span> : null}
                </div>
                <div className="small text-secondary mb-1">{item.date && new Date(item.date).toLocaleString()}</div>
                <div className="mb-1"><span className="badge bg-info me-2">Remarks</span> <span>{item.remarks}</span></div>
              </li>
            )) : <li className="text-secondary">No movement history yet.</li>}
          </ul>

          {/* Forwarding History */}
          {forwards.length > 0 && (
            <>
              <h5 className="mt-4 mb-3">Forwarding History</h5>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Date</th>
                      <th>Action</th>
                      <th>Recipient</th>
                      <th>Sent By</th>
                      <th>Method</th>
                      <th>Status</th>
                      <th>Tracking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forwards.map((forward) => (
                      <tr key={forward.id}>
                        <td>{new Date(forward.datetime).toLocaleDateString()}</td>
                        <td>
                          <span className="badge bg-info">{forward.action}</span>
                        </td>
                        <td>
                          <div><strong>{forward.recipientName}</strong></div>
                          <small className="text-muted">{forward.recipientDepartment}</small>
                        </td>
                        <td>{forward.sentBy}</td>
                        <td>
                          <span className="badge bg-secondary">{forward.sentThrough}</span>
                        </td>
                        <td>
                          <span className={`badge bg-${forward.status === 'Delivered' ? 'success' : forward.status === 'In Transit' ? 'warning' : 'secondary'}`}>
                            {forward.status}
                          </span>
                        </td>
                        <td>
                          {forward.trackingNumber && (
                            <small className="text-muted">{forward.trackingNumber}</small>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .file-details-page-container {
          padding-left: 2.5rem;
          padding-right: 2.5rem;
        }
        @media (max-width: 768px) {
          .file-details-page-container {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
        }
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #fff;
          padding-top: 1rem;
          padding-bottom: 1rem;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.03);
        }
        .main-content-with-header {
          margin-top: 1.5rem;
        }
        .back-btn-spaced {
          margin-left: 1.25rem;
        }
        @media (max-width: 768px) {
          .back-btn-spaced {
            margin-left: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
} 