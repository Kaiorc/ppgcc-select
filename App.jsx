import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Layout from './src/components/Layout'
import AuthRequired from './src/components/AuthRequired'
import { AuthProvider } from './src/components/AuthContext'
import Processes from './src/pages/processes/Processes'
import ActiveProcesses from './src/pages/processes/ActiveProcesses'
import InactiveProcesses from './src/pages/processes/InactiveProcesses'
import MyApplicationsProcesses from './src/pages/processes/MyApplicationsProcesses'
import Process from './src/pages/process/Process'
import ProcessDetail from './src/pages/process/ProcessDetail'
import ProcessNews from './src/pages/process/ProcessNews'
import ProcessNewsDetail from './src/pages/process/ProcessNewsDetail'
import CreateProcess from './src/pages/CreateProcess'
import EditProcess from './src/pages/EditProcess'
import CreateNews from './src/pages/CreateNews'
import EditNews from './src/pages/EditNews'
import Login from './src/pages/Login'
import Signin from './src/pages/Signin'
import NotAuthorized from './src/pages/NotAuthorized'
import NotFound from './src/pages/NotFound'
import Applications from './src/pages/Applications'
import Application from './src/pages/Application'
import ViewDocument from './src/pages/ViewDocument'
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
                <Route path="/processes" element={<Processes />}>
                  <Route index element={<ActiveProcesses />} />
                  <Route path="my-applications" element={<MyApplicationsProcesses />} />
                  <Route path="inactive" element={<InactiveProcesses />} />
                </Route>
                <Route path="/processes/:id" element={<Process />}>
                  <Route index element={<ProcessDetail />} />
                  <Route path="news" element={<ProcessNews />} />
                </Route>
                <Route path="/processes/:id/news/:newsId" element={<ProcessNewsDetail />} />
                <Route path="/processes/:id/application" element={<Application />} />
              </Route>
              <Route element={<AuthRequired requiredRole="administrador"/>}>
                <Route path="/processes/create-process" element={<CreateProcess />} />
                <Route path="/processes/:id/edit-process" element={<EditProcess />} />
                <Route path="/processes/:id/create-news" element={<CreateNews />} />
                <Route path="/processes/:id/news/:newsId/edit-news" element={<EditNews />} />
                <Route path="/processes/:id/applications" element={<Applications />} />
                <Route path="/processes/:processId/applications/evaluate/:uid/view-document" element={<ViewDocument />} />
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