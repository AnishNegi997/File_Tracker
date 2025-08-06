import React, { useState } from 'react';
import { getAllFiles, getFileMovements, getFileForwards } from '../services/dataServices';
import './Track.css';

export default function Track() {
  const [search, setSearch] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const files = getAllFiles();

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const getFileMovementsWithForwards = (fileId) => {
    const movements = getFileMovements(fileId);
    const forwards = getFileForwards(fileId);
    
    // Combine movements with forwarding details
    return movements.map(movement => {
      if (movement.sentBy && movement.sentThrough && movement.recipientName) {
        return {
          ...movement,
          isForward: true,
          forwardDetails: forwards.find(f => 
            f.sentBy === movement.sentBy && 
            f.sentThrough === movement.sentThrough && 
            f.recipientName === movement.recipientName
          )
        };
      }
      return movement;
    });
  };

  // Filter files by code (barcode) or title
  const filteredFiles = files.filter(
    f =>
      f.code.toLowerCase().includes(search.toLowerCase()) ||
      f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="track-container">
      <div className="track-header sticky-header">
        <div className="header-content">
          <div className="header-info">
            <h1 className="track-title">Track File</h1>
            <p className="track-subtitle">Search and track file movements across the system</p>
          </div>
          <div className="text-muted">
            <small>For comprehensive file movement logs, visit the <strong>Logs</strong> page</small>
          </div>
        </div>
      </div>

      <div className="search-section sticky-search">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter file name or barcode..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
        </div>
      </div>
      <div className="files-section scrollable-files-list">
        <div className="files-table">
          <table>
            <thead>
              <tr>
                <th>Barcode</th>
                <th>Title</th>
                <th>Status</th>
                <th>Department</th>
                <th>Current Holder</th>
                <th>Last Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <div className="empty-icon">🔍</div>
                      <div className="empty-title">No files found</div>
                      <div className="empty-text">Try searching with a different term or check the logs page</div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredFiles.map(file => (
                  <tr key={file.code} className="file-row" onClick={() => handleFileClick(file)}>
                    <td className="file-barcode">{file.code}</td>
                    <td className="file-title">{file.title}</td>
                    <td>
                      <span className={`status-badge status-${file.status === 'Received' ? 'received' : file.status === 'Released' ? 'released' : file.status === 'On Hold' ? 'hold' : 'complete'}`}>
                        {file.status}
                      </span>
                    </td>
                    <td className="file-department">{file.department}</td>
                    <td className="file-holder">{file.currentHolder}</td>
                    <td className="file-remarks">{file.remarks}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedFile && (
        <div className="timeline-section">
          <div className="timeline-header">
            <h3 className="timeline-title">File Movement Timeline</h3>
            <div className="file-info">
              <span className="file-name">{selectedFile.title}</span>
              <span className="file-code">{selectedFile.code}</span>
            </div>
          </div>
          <ul className="timeline">
            {getFileMovementsWithForwards(selectedFile.code).length > 0 ? getFileMovementsWithForwards(selectedFile.code).map((item, idx) => (
              <li key={idx} className="timeline-item">
                <div className="timeline-icon">{item.icon}</div>
                <div className="timeline-content">
                  <div className="timeline-user">{item.user}</div>
                  <div className="timeline-datetime">{item.datetime}</div>
                  <div className="timeline-action">
                    <span className="action-badge">{item.action}</span>
                    <span className="timeline-remarks">{item.remarks}</span>
                  </div>
                  {item.isForward && item.forwardDetails && (
                    <div className="forward-details">
                      <div className="forward-grid">
                        <div className="forward-item">
                          <div className="forward-label">Sent By</div>
                          <div className="forward-value">{item.sentBy}</div>
                        </div>
                        <div className="forward-item">
                          <div className="forward-label">Sent Through</div>
                          <div className="forward-value">{item.sentThrough}</div>
                        </div>
                        <div className="forward-item">
                          <div className="forward-label">Recipient</div>
                          <div className="forward-value">{item.recipientName}</div>
                        </div>
                        <div className="forward-item">
                          <div className="forward-label">Tracking</div>
                          <div className="forward-value">{item.forwardDetails.trackingNumber || 'N/A'}</div>
                        </div>
                      </div>
                      {item.forwardDetails.deliveryInstructions && (
                        <div className="forward-instructions">
                          <div className="forward-label">Instructions</div>
                          <div className="instructions-text">{item.forwardDetails.deliveryInstructions}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            )) : (
              <li className="timeline-item">
                <div className="timeline-icon">📁</div>
                <div className="timeline-content">
                  <div className="timeline-remarks">No movement history yet.</div>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
} 