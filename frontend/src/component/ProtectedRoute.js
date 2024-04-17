import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
<Container maxWidth="md" style={{ padding: '20px' }}>
<Typography variant="h4" gutterBottom>
  Welcome, {userData && userData.name}
</Typography>
{userData && (
  <div>
    <Typography>Email: {userData.email}</Typography>
    {/* Add other user details as needed */}
  </div>