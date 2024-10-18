import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Layout from './src/components/Layout'
import Home from './src/pages/Home'

export default function App() {

  const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html,
    body {
        margin: 0;
        padding: 0;
        background-color: #fff7ed;
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

  return (
    <>
      <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}