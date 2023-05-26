import { z } from "zod";
import { Database } from "../database/index.js";

export class CreateTaskController{
  constructor(){
    this.db = new Database()
  }
  
   handle = async (req, res)=>{
    // creating validation schema
    const bodySchema = z.object({
      title: z.string(),
      description: z.string().max(200)
    })

    // validating
    const {title, description} = bodySchema.parse(req.body)

    // creating task
    await this.db.insert("tasks", {title, description})

    // returning response
    res.writeHead(201).end()
  }
}