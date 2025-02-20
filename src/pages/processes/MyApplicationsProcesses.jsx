import React from "react"
import { getProcessesWithUserApplications } from "../../../services/firebase/firebase-firestore"
import useAuth from "../../hooks/useAuth"
import ProcessesList from "../../components/ProcessesList"

export default function MyApplicationsProcesses() {
    const [myApplicationsSelectionProcesses, setMyApplicationsSelectionProcesses] = React.useState([])

    const { uid } = useAuth()

    React.useEffect(() => {
        async function loadData() {
            const myApplicationsProcesses = await getProcessesWithUserApplications(uid)
            console.log("ActiveProcesses.jsx - myApplicationsSelectionProcesses: ", myApplicationsSelectionProcesses)
            setMyApplicationsSelectionProcesses(myApplicationsProcesses)
        }
        loadData()
    }, [])

    console.log("MyApplicationsProcesses.jsx - ", myApplicationsSelectionProcesses)

    return (
        <>
            <ProcessesList selectionProcesses={myApplicationsSelectionProcesses} />
        </>
    )
}