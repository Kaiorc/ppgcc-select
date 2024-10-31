import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function AuthRequired() {
  const { isLoggedIn } = useAuth();

  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}