import {buildRoutePath} from "../utils/build-route-path.js"
import { CreateTaskController } from "./create-task-controller.js"
import { ListTasksController } from "./list-tasks-controller.js"
import { UpdateTasksController } from "./update-task-controller.js"
import { DeleteTasksController } from "./delete-task-controller.js"
import { CompleteTasksController } from "./complete-task-controller.js"

const createTaskController = new CreateTaskController()
const listTasksController = new ListTasksController()
const updateTasksController = new UpdateTasksController()
const deleteTasksController = new DeleteTasksController()
const completeTasksController = new CompleteTasksController()

export const routes = [
  // CREATE TASK
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: createTaskController.handle
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: updateTasksController.handle
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: listTasksController.handle
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: deleteTasksController.handle
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: completeTasksController.handle
  }
]