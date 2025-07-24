import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

// Componente de layout que renderiza o cabeçalho, o conteúdo principal e o rodapé.
// O Outlet é usado para renderizar os componentes filhos dentro do layout
export default function Layout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}