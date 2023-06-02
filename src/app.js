import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes/index.js"
import { extractQueryParams } from "./utils/extract-query-params.js"
import { csv } from "./middlewares/csv.js"

const app = http.createServer(async (req, res)=> {
  const {method, url} = req

  const route = routes.find(route=>{
    return route.method === method && route.path.test(url)
  })

  if(route){
    if(route.contentType === "application/json"){
      await json(req, res)
    }else{
      await csv(req, res)
    }

    const routeParams = url.match(route.path)

    const {query, ...params} = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

export default app