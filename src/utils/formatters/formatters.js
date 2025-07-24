// Funções de formatação para exibir dados da forma necessária

// Função que formata o nome completo para exibir apenas os dois primeiros nomes
export function formatFirstTwoNames(fullName) {
    if (!fullName) return ""
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

// Função que formate a data do que vem do Firestore
// Exemplo: "2023-10-05" para "05/10/2023"
export function formatFirestoreDate(date) {
    if (!date) return "" // ou algum valor padrão
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
}

// Função que formata o timestamp do Firestore para uma string legível
// Exemplo: { seconds: 1696512000 } para "05/10/2023 00:00:00"
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp.seconds * 1000)
    return date.toLocaleString()
}

// Função que formata a descrição do processo, substituindo quebras de linha por <br> e links por <a>
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