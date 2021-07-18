import { statusOccurrences } from "../entities/statusOccurrences";

class StatusOccurrencesSchema {
    id: string;
    description: string;
    value: number

    constructor(statusOccurrences: statusOccurrences) {
        this.id = statusOccurrences.id
        this.description = statusOccurrences.description
        this.value = statusOccurrences.value
    }
}

export {
    StatusOccurrencesSchema
}