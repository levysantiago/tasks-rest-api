import { Database } from "../database/index.js"

export class ListTasksController{
  constructor(){
    this.db = new Database()
  }

  handle = async (req, res)=>{
    // selecting all tasks
    const tasks = await this.db.select("tasks")

    // returning tasks to client
    res.writeHead(200).end(JSON.stringify({tasks}))
  }
}