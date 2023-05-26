import {randomUUID} from "node:crypto"
import fs from "node:fs/promises"

const databaseFile = process.env.NODE_ENV === "development" ? process.env.DATABASE_FILE : "db.test.json"
const databasePath = new URL(`./${databaseFile}`, import.meta.url)

export class Database{
  #database = {}

  constructor(){
    // Updating local database
    fs.readFile(databasePath, "utf8").then(data=>{
      this.#database = JSON.parse(data)
    }).catch(()=>{
      this.#persist()
    })
  }

  async #persist(){
    // persisting local database to file
    await fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2))
  }

  insert = async (table, data)=>{
    // Creating task
    const task = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date()
    }

    // Persisting task
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(task)
    }else{
      this.#database[table] = [task]
    }
    await this.#persist()

    return task
  }
}