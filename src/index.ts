import http, { IncomingMessage, ServerResponse } from "http";
import path from "path";
import fs from "fs/promises";

async function requestListener(req: IncomingMessage, res: ServerResponse) {
  const filepath = path.join(__dirname, "static/index.html");

  const data = await fs.readFile(filepath);

  res.writeHead(200, {
    "content-type": "text/html",
    "content-length": data.length,
  });

  res.write(data);

  res.end();
}

http.createServer(requestListener).listen(3000, () => {
  console.log("Server is running on port 3000");
});
