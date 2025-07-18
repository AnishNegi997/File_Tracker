import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } else {
      const result = login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">📁</div>
          <h1 className="auth-title">File Tracker</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            Invalid email or password
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Enter your password"
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/signup" className="text-primary">Sign up</Link>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gray-50);
          padding: var(--space-4);
        }

        .auth-card {
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: var(--space-8);
          width: 100%;
          max-width: 400px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .auth-icon {
          font-size: 3rem;
          margin-bottom: var(--space-4);
        }

        .auth-title {
          font-size: var(--font-size-2xl);
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--space-2);
        }

        .auth-subtitle {
          color: var(--gray-500);
          font-size: var(--font-size-sm);
        }

        .auth-form {
          margin-bottom: var(--space-6);
        }

        .form-group {
          margin-bottom: var(--space-4);
        }

        .auth-footer {
          text-align: center;
          font-size: var(--font-size-sm);
        }

        .alert {
          padding: var(--space-3);
          border-radius: var(--radius);
          margin-bottom: var(--space-4);
          font-size: var(--font-size-sm);
        }

        .alert-danger {
          background: #fef2f2;
          color: var(--danger);
          border: 1px solid #fecaca;
        }
      `}</style>
    </div>
  );
} 