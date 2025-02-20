import React from "react"
import { loadInactiveProcesses } from "../../../services/firebase/firebase-firestore"
import ProcessesList from "../../components/ProcessesList"

export default function InactiveProcesses() {
    const [inactiveSelectionProcesses, setInactiveSelectionProcesses] = React.useState([])

    React.useEffect(() => {
        async function loadData() {
            const inactiveProcesses = await loadInactiveProcesses()
            console.log("InactiveProcesses.jsx - inactiveProcesses: ", inactiveProcesses)
            setInactiveSelectionProcesses(inactiveProcesses)
        }
        loadData()
    }, [])

    console.log("InactiveProcesses.jsx - ", inactiveSelectionProcesses)

    return (
        <>
            <ProcessesList selectionProcesses={inactiveSelectionProcesses} />
        </>
    )
}