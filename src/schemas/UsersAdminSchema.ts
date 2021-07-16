class UsersAdminSchema {
    id: string;
    name: string;
    email: string;
    chapa: string;
    created_at: string;
    updated_at: string;

    constructor({ id, name, email, chapa, created_at, updated_at }) {
        this.id = id
        this.name = name
        this.email = email
        this.chapa = chapa
        this.created_at = created_at
        this.updated_at = updated_at
    }
}

export {
    UsersAdminSchema
}