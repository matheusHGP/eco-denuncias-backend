const createUsersPayload = {
    name: {
        errorMessage: 'Nome incorreto',
    },
    password: {
        isLength: {
            errorMessage: 'Senha deve conter no mínimo 8 caracteres',
            options: { min: 8 }
        }
    }
}

export {
    createUsersPayload
}