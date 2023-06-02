import { z } from "zod"
import { Database } from "../database/index.js"

export class UpdateTasksController{
  constructor(){
    this.db = new Database()
  }

  handle = async (req, res)=>{
    // creating params validation schema
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    // creating body validation schema
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      isCompleted: z.coerce.boolean()
    })

    // validating params
    const { id } = paramsSchema.parse(req.params)

    // validating body
    const { title, description, isCompleted } = bodySchema.parse(req.body)

    try{
      // selecting all tasks
      await this.db.update("tasks", id, {
        title, 
        description, 
        completed_at: isCompleted ? new Date() : undefined
      })
    } catch(e){
      if(e.message === "Task not found"){
        return res.writeHead(404).end(JSON.stringify({error: {status: 404, reason: "Task not found"}}))
      }

      return res.writeHead(500).end(JSON.stringify({error: {status: 500, reason: "Server error"}}))
    }

    // returning tasks to client
    res.writeHead(200).end()
  }
}