import {config} from  "dotenv"
import axios from "axios"
import app from "../app"
import fs from "node:fs/promises"
import fsSync from "node:fs"
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { resolve } from "node:path"

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

  it("should update the registered task", async ()=>{
    // Creating first task
    await api.post("/tasks", {
      title: "first task", 
      description: "This is a new task"
    })

    // Listing tasks
    let listResponse = await api.get("/tasks")

    // Updating task
    await api.put(`/tasks/${listResponse.data.tasks[0].id}`, {
      title: "new task title", 
      description: "This is the new description of the old task",
    })

    // Listing tasks
    listResponse = await api.get("/tasks")

    expect(listResponse.data.tasks).toEqual([
      expect.objectContaining({ 
        title: "new task title", 
        description: "This is the new description of the old task"
      }),
    ])
  })

  it("should throw not found error on update", async ()=>{
    // Creating first task
    await api.post("/tasks", {
      title: "update this task", 
      description: "This task should be updated."
    })

    try{

      // Trying to update task
      await api.put(`/tasks/073f679e-70ad-4980-966f-0b05ed3a3ce3`, {
        title: "new task title", 
        description: "This is the new description of the old task",
      })

      throw new Error("Should throw error 'Task not found'")
    }catch(err){
      // Expecting task list is empty
      expect(err.response.data).toEqual({
        error: {
          status: 404,
          reason: "Task not found"
        }
      })
    }
  })

  it("should delete registered task", async ()=>{
    // Creating first task
    await api.post("/tasks", {
      title: "delete this task", 
      description: "This task should be deleted."
    })

    // Listing tasks
    let listResponse = await api.get("/tasks")

    // Deleting task
    await api.delete(`/tasks/${listResponse.data.tasks[0].id}`)

    // Listing tasks
    listResponse = await api.get("/tasks")

    // Expecting task list is empty
    expect(listResponse.data.tasks).toEqual([])
  })

  it("should throw not found error on delete", async ()=>{
    // Creating first task
    await api.post("/tasks", {
      title: "delete this task", 
      description: "This task should be deleted."
    })

    try{

      // Deleting task
      await api.delete(`/tasks/073f679e-70ad-4980-966f-0b05ed3a3ce3`)

      throw new Error("Should throw error 'Task not found'")
    }catch(err){
      // Expecting task list is empty
      expect(err.response.data).toEqual({
        error: {
          status: 404,
          reason: "Task not found"
        }
      })
    }
  })

  it("should complete task", async ()=>{
    // Creating first task
    await api.post("/tasks", {
      title: "new task", 
      description: "This is a new task."
    })

    // Listing tasks
    let listResponse = await api.get("/tasks")

    // Deleting task
    await api.patch(`/tasks/${listResponse.data.tasks[0].id}/complete`)

    // Listing tasks
    listResponse = await api.get("/tasks")

    // Expecting task is completed
    expect(listResponse.data.tasks[0].completed_at).toBeTypeOf("string")
  })

  it("should create tasks by csv file", async ()=>{
    // Creating first task
    await api.post("/tasks/csv", fsSync.createReadStream(resolve(__dirname, '../../assets/csvExample.csv')), {headers: {"Content-Type": "multipart/form-data"}})

    // Listing tasks
    let listResponse = await api.get("/tasks")

    // Expecting tasks were created
    expect(listResponse.data.tasks).toEqual([
      expect.objectContaining({ title: "Task 01", description: "Descrição da Task 01"}),
      expect.objectContaining({ title: "Task 02", description: "Descrição da Task 02"}),
      expect.objectContaining({ title: "Task 03", description: "Descrição da Task 03"}),
      expect.objectContaining({ title: "Task 04", description: "Descrição da Task 04"}),
      expect.objectContaining({ title: "Task 05", description: "Descrição da Task 05"}),
    ])
  })
})