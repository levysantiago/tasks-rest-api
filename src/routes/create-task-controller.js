import { Database } from "../database/index.js";

export class CreateTaskController{
  constructor(){
    this.db = new Database()
  }
  
   handle = async (req, res)=>{
    const {title, description} = req.body;

    // creating task
    await this.db.insert("tasks", {title, description})

    // returning response
    res.writeHead(201).end()
  }
}