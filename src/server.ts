import "reflect-metadata"
import express, { Request, Response } from "express"

import "./database"

const app = express()

app.post('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Hello World'
    })
})

app.listen(6000, () => {
    console.log("Server is running")
})