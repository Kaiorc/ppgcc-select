import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Layout from './src/components/Layout'
import AuthRequired from './src/components/AuthRequired'
import { AuthProvider } from './src/components/AuthContext'
import Processes from './src/pages/Processes'
import CreateProcess from './src/pages/CreateProcess'
import EditProcess from './src/pages/EditProcess'
import Login from './src/pages/Login'
import Signin from './src/pages/Signin'
import ProcessDetail from './src/pages/ProcessDetail'
import NotAuthorized from './src/pages/NotAuthorized'
import NotFound from './src/pages/NotFound'
import Applications from './src/pages/Applications'
import Application from './src/pages/Application'
import EvaluateApplication from './src/pages/EvaluateApplication'

const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
  }

  html,
  body {
      margin: 0;
      padding: 0;
      background-color: #fff;
      font-family: "Inter", sans-serif;
  }

  a {
      text-decoration: unset;
      color: unset;
  }

  body::-webkit-scrollbar {
      display: none;
  }

  body {
      -ms-overflow-style: none;
      scrollbar-width: none;
  }
`

export default function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="/signin" element={<Signin />} />
              <Route element={<AuthRequired />}>
                <Route path="/processes" element={<Processes />}/>
                <Route path="/processes/:id" element={<ProcessDetail />} />
                <Route path="/processes/:id/application" element={<Application />} />
              </Route>
              <Route element={<AuthRequired requiredRole="administrador"/>}>
                <Route path="/processes/create-process" element={<CreateProcess />} />
                <Route path="/processes/:id/edit-process" element={<EditProcess />} />
                <Route path="/processes/:id/applications" element={<Applications />} />
                <Route path="/processes/:processId/applications/evaluate/:uid" element={<EvaluateApplication />} />
              </Route>
              <Route path="/not-authorized" element={<NotAuthorized />} />
              <Route path="*" element={<NotFound />} /> 
            </Route>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  )
}