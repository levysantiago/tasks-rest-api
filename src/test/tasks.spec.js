import {config} from  "dotenv"
import axios from "axios"
import app from "../app"
import fs from "node:fs/promises"
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"

config({path: new URL("../../.env.test", import.meta.url), encoding: "utf8"})

const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: [{"Content-Type": "application/json"}]
})

async function clearTestDb(){
  const url = new URL(`../database/${process.env.DATABASE_FILE}`, import.meta.url)
  try{
    fs.writeFile(url, JSON.stringify({}))
  }catch(e){}
}

beforeAll(async ()=>{
  app.listen("3333")
})

beforeEach(async()=>{
  await clearTestDb()
  setTimeout(() => {
    
  }, 500);
})

afterAll(()=>{
  app.close()
})

describe("Tasks routes", ()=>{
  it("should create task", async ()=>{
    const response = await api.post("/tasks", {
      title: "new task", 
      description: "This is a new task"
    })

    expect(response.status).toEqual(201)
  })

  it("should list the registered tasks", async ()=>{
    // Creating first task
    await api.post("/tasks", {
      title: "first task", 
      description: "This is a new task"
    })

    // Creating second task
    await api.post("/tasks", {
      title: "second task", 
      description: "This is a new task"
    })

    // Listing tasks
    const response = await api.get("/tasks")

    expect(response.data.tasks).toEqual([
      expect.objectContaining({ title: "first task", description: "This is a new task"}),
      expect.objectContaining({ title: "second task", description: "This is a new task"}),
    ])
  })
})