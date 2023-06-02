import { z } from "zod"
import { Database } from "../database/index.js"

export class CreateTasksByCsvController{
  constructor(){
    this.db = new Database()
  }

  handle = async (req, res)=>{
    // Creating body validation schema
    const bodySchema = z.object({
      data: z.string()
    })

    // Validating body
    const { data } = bodySchema.parse(req.body)

    // spliting lines
    const lines = data.split("\n")
    
    // Removing first line
    lines.shift()

    // Registering all the tasks
    await lines.reduce(async (prev, line)=>{
      await prev;
      // Splitting properties
      const properties = line.split(",")

      if(properties[0] && properties[1]){ 
        // Creating task
        await this.db.insert("tasks", {
          title: properties[0], 
          description: properties[1]
        })
      }
    }, {})

    

    // returning tasks to client
    res.writeHead(201).end()
  }
}