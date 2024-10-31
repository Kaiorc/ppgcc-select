import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div role="alert" aria-live="assertive">
            <h1>Página não encontrada</h1>
            <Link to="/" aria-label="Voltar para a tela inicial">Volte para tela inicial</Link>
        </div>
    )
}