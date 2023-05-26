import {buildRoutePath} from "./utils/build-route-path.js"

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users/:id"),
    handler: (request, response)=>{
      console.log(request);
    }
  }
]