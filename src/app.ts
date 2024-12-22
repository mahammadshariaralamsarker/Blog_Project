import express, { Application, Request, Response } from "express";
import cors from 'cors'
import router from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
 
const app: Application = express()

// parserrs
app.use(express.json())
app.use(cors())

// root
app.get("/", (req: Request, res: Response) => {
    res.send("Hello Server");
});

// all router
app.use('/api', router)

// global error handel 
app.use(globalErrorHandler)

// not found page
app.use(notFound)

export default app;



 