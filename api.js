export async function getProcess(id) {
    const url = id ? `/api/processes/${id}` : "/api/processes"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch processes",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.processes
}