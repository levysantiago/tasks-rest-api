import { z } from "zod";
import { Database } from "../database/index.js";

export class DeleteTasksController{
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

    try{
      // creating task
      await this.db.delete("tasks", id)
    }catch(e){
      if(e.message === "Task not found"){
        return res.writeHead(404).end(JSON.stringify({error: {status: 404, reason: "Task not found"}}))
      }

      return res.writeHead(500).end(JSON.stringify({error: {status: 500, reason: "Server error"}}))
    }

    // returning response
    return res.writeHead(200).end()
  }
}