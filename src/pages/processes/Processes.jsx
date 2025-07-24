import React from "react"
import { styled } from "styled-components"
import { Link, NavLink, Outlet } from "react-router-dom"
import { getProcesses } from "../../../services/firebase/firebase-firestore"
import useRole from "../../hooks/useRole"
import Box from "../../components/Box"
import Button from "../../components/Button"

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%;
    padding: 1rem;
`

const ListHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${({ $isAdmin }) => ($isAdmin ? 'space-evenly' : 'center')};
    gap: 5em;
    align-items: center;
    width: 100%;
    padding: 1rem;
    border-radius: 8px 8px 0 0;
    background-color: #008442;
    color: white;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
`

const ListNav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: white;
    background-color: #008442;

    a {
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        padding: 1rem;   
        width: 100%;
        background-color: #006734;
        border-right: 2px solid #F0852E;
        border-left: 2px solid #F0852E;

        &:hover {
            background-color: #F0852E;
            transition-duration: 0.2s;
        }
        &:active {
            background-color: #A45516;
        }
    }

    a.active {
        color: white;
        background-color: #F0852E;
    }
`

// Componente principal que renderiza a lista de processos seletivos
export default function Processes() {
    // Estado para armazenar os processos seletivos
    const [selectionProcesses, setSelectionProcesses] = React.useState([])

    // Hook para verificar se o usuário é um administrador
    // Ele retorna um booleano que indica se o usuário tem a função de administrador
    const isAdmin = useRole()
    
    // useEffect para carregar os processos seletivos ao montar o componente
    React.useEffect(() => {
        async function loadProcesses() {
            const data = await getProcesses()
            setSelectionProcesses(data)
        }
        loadProcesses()
    }, [])

    return (
        <HomeContainer>
        <Box>
            <ListHeader $isAdmin={isAdmin}>
                <h1>PROCESSOS SELETIVOS</h1>
                {isAdmin && (
                    <Link to="create-process">
                        <Button type="button">ADICIONAR</Button>  
                    </Link>
                )}
            </ListHeader>
            <ListNav>
                <NavLink 
                    to="/processes" 
                    end
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    ATIVOS
                </NavLink>
                <NavLink 
                    to="/processes/inactive"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    INATIVOS
                </NavLink>
                {!isAdmin && ( 
                    <NavLink
                        to="/processes/my-applications"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        INSCRITO
                    </NavLink>
                )}
            </ListNav>
            <Outlet />
        </Box>
    </HomeContainer>
    )
}