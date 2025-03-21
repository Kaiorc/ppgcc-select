
// Função para validar o arquivo de inscrição
function validateFile(value) {
    if (!value || !value[0]) return true
    const file = value[0]
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
    const maxSize = 2 * 1024 * 1024 // "O arquivo deve ter no máximo 2MB"
    
    if (!allowedTypes.includes(file.type)) {
        return "Tipo de arquivo não suportado"
    }
    
    if (file.size > maxSize) {
        return "O arquivo deve ter no máximo 2MB"
    }
    
    return true
}

// Função para validar o formulário de inscrição
export function getApplicationValidationRules(info) {
    // Regra padrão para obrigatoriedade
    let rules = { required: info.required ? `${info.name} é obrigatório` : false };
  
    if (info.type === "text") {
        rules = {
            ...rules,
            minLength: { value: 3, message: `${info.name} deve ter no mínimo 3 caracteres` },
            maxLength: { value: 50, message: `${info.name} deve ter no máximo 50 caracteres` }
        }
    } else if (info.type === "email") {
            rules = {
            ...rules,
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Formato de email inválido"
            }
        }
    } else if (info.type === "file") {
        rules = {
            required: info.required ? `${info.name} é obrigatório` : false,
            validate: validateFile
        }
    }

    return rules
}