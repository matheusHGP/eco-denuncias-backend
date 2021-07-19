import "reflect-metadata"
import express, { Request, Response } from "express"
import "express-async-errors"
import cors from 'cors'
import bodyParser from 'body-parser'

require('dotenv/config')

import "./database"
import { router } from "./routes"
import { NextFunction } from "express-serve-static-core"

const app = express()

app.use(express.json({ limit: '100mb' }))

app.use(cors())
app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
        return response.status(400).json({
            message: error.message
        })
    }

    return response.status(500).json({
        message: "Internal Server Error"
    })
})

app.listen(6000, () => {
    console.log(`Server is running: 6000`)
})