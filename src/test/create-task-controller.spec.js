import {config} from  "dotenv"
import axios from "axios"
import app from "../app"
import fs from "node:fs/promises"

config({path: new URL("../../.env.test", import.meta.url), encoding: "utf8"})

const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: [{"Content-Type": "application/json"}]
})

function clearTestDb(){
  const url = new URL(`../database/${process.env.DATABASE_FILE}`, import.meta.url)
  fs.rm(url).catch(()=>{
    fs.writeFile(url, "{}")
  })
}

beforeAll(()=>{
  clearTestDb()
  app.listen("3333")
})

beforeEach(()=>{
  clearTestDb()
})

afterAll(()=>{
  app.close()
})

describe("Create Task", ()=>{
  it("should create task", async ()=>{
    const response = await api.post("/tasks", {
      title: "new task", 
      description: "This is a new task"
    })

    expect(response.status).toEqual(201)
  })
})