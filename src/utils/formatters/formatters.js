
export function formatFirstTwoNames(fullName) {
    const names = fullName.split(" ")
    let firstTwoNames = names[0]

    for (let i = 1; i < names.length; i++) {
        if (names[i].length >= 3) {
            firstTwoNames += " " + names[i]
            break
        }
    }

    return firstTwoNames
}

export function formatFirestoreDate(date) {
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
}

export function formatTimestamp(timestamp) {
    const date = new Date(timestamp.seconds * 1000)
    return date.toLocaleString()
}

export function formatProcessDescription(description) {
    if (!description) return ""
    
    const formattedDescription = description.replace(/\n/g, "<br>")
    
    const linkedDescription = formattedDescription.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>')
    return linkedDescription
}

// export function formatDocumentUrl(url) {
//     return (
//         <Button onClick={() => window.open(url, "_blank")}>
//             VISUALIZAR DOCUMENTO
//         </Button>
//     )
// }