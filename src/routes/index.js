import {buildRoutePath} from "../utils/build-route-path.js"
import { CreateTaskController } from "./create-task-controller.js"

const createTaskController = new CreateTaskController()

export const routes = [
  // CREATE TASK
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: createTaskController.handle
  }
]