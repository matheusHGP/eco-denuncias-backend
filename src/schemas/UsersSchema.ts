class UsersSchema {
    name: string;
    email: string;
    cpf: string;
    cep: string;
    created_at: string;
    updated_at: string;

    constructor({ name, email, cpf, cep, created_at, updated_at }) {
        this.name = name
        this.email = email
        this.cpf = cpf
        this.cep = cep
        this.created_at = created_at
        this.updated_at = updated_at
    }
}

export {
    UsersSchema
}