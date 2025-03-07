// Função para validar o campo "name". remove espaços em branco no início e no fim
// da string. Se o nome estiver vazio após a remoção dos espaços, retorna "O nome é
// obrigatório". Caso contrário, retorna null
function validateName(name) {
    if (!name.trim()) {
        return "O nome é obrigatório"
    }
    return null
}

// Função para validar o número de vagas. Verifica se places é null, undefined, ou uma
// string vazia. Converte places para um número inteiro usando parseInt com base decimal (10). Se o valor
// convertido for menor que 1, retorna "Número de vagas deve ser maior que 0". Caso contrário, retorna null
function validatePlaces(places) {
    // Verifica se places é null, undefined, ou uma string vazia. Se for,
    // a função retorna a mensagem de erro "Número de vagas deve ser maior que 0"
    if (!places || parseInt(places, 10) < 1) {
        return "Número de vagas deve ser maior que 0"
    }
    return null
}

// Função para validar a "miniDescription". Calcula o comprimento da string após remover 
// espaços em branco no início e no fim. Se o comprimento for menor que 10, retorna "A mini
// descrição deve ter pelo menos 10 caracteres". Caso contrário, retorna null
function validateMiniDescription(miniDescription) {
    if (miniDescription.trim().length < 10) {
        return "A mini descrição deve ter pelo menos 10 caracteres"
    }
    return null
}

// Função para validar a "description". Calcula o comprimento da string após remover espaços em
// branco no início e no fim. Se o comprimento for menor que 20, retorna "A descrição deve ter
// pelo menos 20 caracteres". Caso contrário, retorna null
function validateDescription(description) {
    if (description.trim().length < 20) {
        return "A descrição deve ter pelo menos 20 caracteres"
    }
    return null
}

// Função para validar a data de início. Converte startDate e today para objetos Date. Compara as
// datas. Se startDate for anterior a today, retorna "A data de início não pode ser no passado". Caso
// contrário, retorna null
function validateStartDate(startDate, today) {
    if (startDate && new Date(startDate) < new Date(today)) {
        return "A data de início não pode ser no passado"
    }
    return null
}

// Função para validar a data de término. Converte startDate e endDate para objetos Date. Compara as
// datas. Se endDate for anterior ou igual a startDate, retorna "A data de término deve ser posterior
// à data de início". Caso contrário, retorna null
function validateEndDate(startDate, endDate) {
    if (startDate && endDate) {
        if (new Date(endDate) <= new Date(startDate)) {
        return "A data de término deve ser posterior à data de início"
        }
    }
    return null
}

// Função principal que chama as funções de validação específicas que retornam a primeira
// mensagem de erro encontrada, ou null se não houverem erros
export function validateProcessForm(processFormData, today) {
    return (
        validateName(processFormData.name) ||
        validateMiniDescription(processFormData.miniDescription) ||
        validateDescription(processFormData.description) ||
        validatePlaces(processFormData.places) ||
        validateStartDate(processFormData.startDate, today) ||
        validateEndDate(processFormData.startDate, processFormData.endDate)
    )
}

// Função para remover tags HTML do input. Usa uma expressão regular para remover tags
// HTML (/<\/?[^>]+(>|$)/g) e usa .trim() remover espaços em branco no início e no fim da string.
export function sanitizeInput(value) {
    return value.replace(/<\/?[^>]+(>|$)/g, "").trim()
}