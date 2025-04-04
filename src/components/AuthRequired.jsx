import React from 'react'
import ReactLoading from 'react-loading'
import { Outlet, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import useAuth from '../hooks/useAuth'

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 5em; 
`

export default function AuthRequired({requiredRole}) {
  
  const { isLoggedIn, isEmailVerified, userRole } = useAuth()

  // console.log("AuthRequired.jsx - ", isLoggedIn)

  if (isLoggedIn === null) {
    return (
      <LoaderContainer>
        <ReactLoading 
            type={"spinningBubbles"}
            color={"#008442"}
            height={"10%"}
            width={"10%"}
        />
      </LoaderContainer>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  if (!isEmailVerified) {
    return <Navigate to="/email-verification" replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />
}