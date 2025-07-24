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
// Hook que verifica se o usuário está autenticado e se possui o papel necessário para acessar a rota,
// se não estiver autenticado, redireciona para a página de login
export default function AuthRequired({requiredRole}) {
  
  // Obtém os estados de autenticação e informações do usuário do contexto de autenticação
  // usando o hook useAuth
  const { isLoggedIn, isEmailVerified, userRole } = useAuth()

  // Se o estado de autenticação ainda não foi determinado, exibe um spinner de carregamento
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

  // Se o usuário não estiver logado, redireciona para a página de login
  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  // Se o usuário não tiver o e-mail verificado, redireciona para a página de verificação de e-mail
  if (!isEmailVerified) {
    return <Navigate to="/email-verification" replace />
  }

  // Se um papel específico for necessário e o usuário não tiver esse papel, redireciona para a página de não autorizado
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />
}