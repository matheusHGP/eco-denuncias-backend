class UsersSchema {
    id: string;
    name: string;
    email: string;
    last_name: string;
    whatsapp: string;
    cpf: string;
    cep: string;
    created_at: string;
    updated_at: string;

    constructor({ id, name, email, last_name, whatsapp, cpf, cep, created_at, updated_at }) {
        this.id = id
        this.name = name
        this.email = email
        this.last_name = last_name
        this.whatsapp = whatsapp
        this.cpf = cpf
        this.cep = cep
        this.created_at = created_at
        this.updated_at = updated_at
    }
}

export {
    UsersSchema
}