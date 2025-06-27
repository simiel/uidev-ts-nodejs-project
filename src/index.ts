import http, { IncomingMessage, ServerResponse } from "http";
import path from "path";
import fs from "fs/promises";
import url from "url";

async function requestListener(req: IncomingMessage, res: ServerResponse) {
  const parsedUrl = url.parse(req.url || "", true);

  let data = "";
  let statusCode = 200;

  try {
    let pathName = parsedUrl.pathname;
    if (pathName === "/") {
      pathName = "/index";
    }

    const filepath = path.join(__dirname, `static${pathName}.html`);
    data = await fs.readFile(filepath, "utf-8");
  } catch {
    data = await fs.readFile(path.join(__dirname, "static/404.html"), "utf-8");
    statusCode = 404;
  }

  const filepath = path.join(__dirname, "static/index.html");

  res.writeHead(statusCode, {
    "content-type": "text/html",
    "content-length": data.length,
  });

  res.write(data);

  res.end();
}

http.createServer(requestListener).listen(3000, () => {
  console.log("Server is running on port 3000");
});
