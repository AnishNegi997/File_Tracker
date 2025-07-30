import React from 'react'

function AccessDenied() {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>You are not authorized to access this page.</p>
      <Link to="/">Go back to the home page</Link>
    </div>
  )
}

export default AccessDenied
