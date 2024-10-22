import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Layout from './src/components/Layout'
import Home from './src/pages/Home'
import Login from './src/pages/Login'
import Signin from './src/pages/Signin'

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
    <>
      <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signin" element={<Signin />} />

            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}