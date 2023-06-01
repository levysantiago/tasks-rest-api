import { z } from "zod";
import { Database } from "../database/index.js";

export class CompleteTasksController{
  constructor(){
    this.db = new Database()
  }
  
   handle = async (req, res)=>{
    // creating validation schema
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    // validating
    const { id } = paramsSchema.parse(req.params)

    // creating task
    await this.db.update("tasks", id, { completed_at: new Date() })

    // returning response
    res.writeHead(201).end()
  }
}