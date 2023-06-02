import {buildRoutePath} from "../utils/build-route-path.js"
import { CreateTaskController } from "./create-task-controller.js"
import { ListTasksController } from "./list-tasks-controller.js"
import { UpdateTasksController } from "./update-task-controller.js"
import { DeleteTasksController } from "./delete-task-controller.js"
import { CompleteTasksController } from "./complete-task-controller.js"
import { CreateTasksByCsvController } from "./create-tasks-by-csv-controller.js"

const createTaskController = new CreateTaskController()
const createTasksByCsvController = new CreateTasksByCsvController()
const listTasksController = new ListTasksController()
const updateTasksController = new UpdateTasksController()
const deleteTasksController = new DeleteTasksController()
const completeTasksController = new CompleteTasksController()

export const routes = [
  // CREATE TASK
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: createTaskController.handle,
    contentType: "application/json"
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks/csv"),
    handler: createTasksByCsvController.handle,
    contentType: "text/csv"
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: updateTasksController.handle,
    contentType: "application/json"
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: listTasksController.handle,
    contentType: "application/json"
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: deleteTasksController.handle,
    contentType: "application/json"
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: completeTasksController.handle,
    contentType: "application/json"
  }
]