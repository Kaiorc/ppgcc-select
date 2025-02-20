import React from "react"
import { loadActiveProcesses } from "../../../services/firebase/firebase-firestore"
import ProcessesList from "../../components/ProcessesList"

export default function ActiveProcesses() {
    const [activeSelectionProcesses, setActiveSelectionProcesses] = React.useState([])

    React.useEffect(() => {
        async function loadData() {
            const activeProcesses = await loadActiveProcesses()
            console.log("ActiveProcesses.jsx - activeProcesses: ", activeProcesses)
            setActiveSelectionProcesses(activeProcesses)
        }
        loadData()
    }, [])

    console.log("ActiveProcesses.jsx - ", activeSelectionProcesses)

    return (
        <>
            <ProcessesList selectionProcesses={activeSelectionProcesses} />
        </>
    )
}