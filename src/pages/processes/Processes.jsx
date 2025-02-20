import React from "react"
import { styled } from "styled-components"
import { Link, NavLink, Outlet } from "react-router-dom"
import { getProcesses } from "../../../services/firebase/firebase-firestore"
import { formatFirestoreDate } from "../../../formatters/formatters"
import useRole from "../../hooks/useRole"
import Box from "../../components/Box"
import Button from "../../components/Button"
import ProcessesList from "../../components/ProcessesList"

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
    justify-content: ${({ $isAdmin }) => ($isAdmin ? 'space-between' : 'center')};
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
        &:hover {
            background-color: #F0852E;
            transition-duration: 0.2s;
        }
        &:active {
            background-color: #A45516;
        }
    }

    a.active {
        background-color: #F0852E;
        color: white;
    }
`

export default function Processes() {
    const [selectionProcesses, setSelectionProcesses] = React.useState([])

    const isAdmin = useRole()
    // console.log("Processes.jsx - isAdmin: ", isAdmin)
    
    React.useEffect(() => {
        async function loadProcesses() {
            const data = await getProcesses()
            setSelectionProcesses(data)
        }
        loadProcesses()
    }, [])

    console.log("Processes.jsx - ", selectionProcesses)
    console.log("Processes.jsx - ", typeof selectionProcesses)

    // const processesElements = selectionProcesses.map((process) => {
    //     return (
    //         <Link 
    //             to={`/processes/${process.id}`}
    //             key={process.id}
    //             aria-label={`Processo seletivo ${process.name}`}
    //         >
    //             <ListItem 
    //                 key={process.id}
    //                 role="listitem"
    //             >
    //                 <h3>{process.name}</h3>
    //                 <div>
    //                     <BoldInfo>{process.miniDescription}</BoldInfo>
    //                     <p><BoldInfo>Data de início:</BoldInfo> {formatFirestoreDate(process.startDate)}</p>
    //                     <p><BoldInfo>Data limite:</BoldInfo> {formatFirestoreDate(process.endDate)}</p> 
    //                 </div>
    //             </ListItem>
    //         </Link>
    //     )
    // })

    return (
        // <HomeContainer>
        //     <Box>
        //         <ListHeader>
        //             <h1>PROCESSOS SELETIVOS</h1>
        //             {
        //                 isAdmin ?
        //                     <Link to="create-process">
        //                         <Button type="button">ADICIONAR</Button>  
        //                     </Link>
        //                     :
        //                     null
        //             }
        //         </ListHeader>
        //         <List role="list">
        //             {processesElements}
        //         </List>
        //     </Box>
        // </HomeContainer>
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
                {isAdmin ? (
                    <NavLink 
                        to="/processes/inactive"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        INATIVOS
                    </NavLink>
                ) : (
                    <NavLink
                        to="/processes/my-applications"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        MINHAS INSCRIÇÕES
                    </NavLink>
                )}
            </ListNav>
            {/* <List role="list">
                {processesElements.length > 0 ? processesElements : <p>Nenhum processo seletivo disponível.</p>}
                <Outlet />
            </List> */}
            {/* <ProcessesList selectionProcesses={selectionProcesses} /> */}
            <Outlet />
        </Box>
    </HomeContainer>
    )
}