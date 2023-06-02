export async function csv(req, res){
  const buffers = []

  for await (const chunk of req){
    buffers.push(chunk)
  }
  
  try{
    // Parsing csv content
    let csvData = Buffer.concat(buffers).toString()

    // If there are boundaries, we remove it
    if(csvData.includes("Content-Type: text/csv")){
      const rawFormDataStart = csvData.split("Content-Type: text/csv")[1].slice(4)
      const nextBoundaryIndex = rawFormDataStart.indexOf("--")
      csvData = rawFormDataStart.slice(0, nextBoundaryIndex-2)
    }

    req.body = { data: csvData }
  }catch(e){
    console.log(e);
    req.body = null
  }

  res.setHeader("Content-type", "text/csv")
}