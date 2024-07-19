import React from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import JobManagement from './JobManagement';
import ReportManagement from './ReportManagement';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="user-management">User Management</Link></li>
          <li><Link to="job-management">Job Management</Link></li>
          <li><Link to="report-management">Report Management</Link></li>
        </ul>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="user-management" element={<UserManagement />} />
          <Route path="job-management" element={<JobManagement />} />
          <Route path="report-management" element={<ReportManagement />} />
          <Route path="*" element={<Navigate to="user-management" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
