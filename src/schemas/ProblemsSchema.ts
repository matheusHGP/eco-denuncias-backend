import { problems } from "../entities/problems"

class ProblemsSchema {
    id: string;
    description: string;
    status: number;
    hash_image: string;

    constructor(problem: problems) {
        this.id = problem.id
        this.description = problem.description
        this.status = problem.status
        this.hash_image = problem.hash_image
    }
}

export {
    ProblemsSchema
}