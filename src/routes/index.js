import {buildRoutePath} from "../utils/build-route-path.js"
import { CreateTaskController } from "./create-task-controller.js"
import { ListTasksController } from "./list-tasks-controller.js"

const createTaskController = new CreateTaskController()
const listTasksController = new ListTasksController()

export const routes = [
  // CREATE TASK
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: createTaskController.handle
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: listTasksController.handle
  }
]