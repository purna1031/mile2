const fs = require("fs");
const http = require("http");
const url = require("url");

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});
fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});
fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  res.writeHead(200, { "Content-Type": "text/html" });

  switch (pathname) {
    case "/project":
      res.write(projectContent);
      res.end();
      break;
    case "/registration":
      res.write(registrationContent);
      res.end();
      break;
    default:
      res.write(homeContent);
      res.end();
      break;
  }
});

const portIndex = process.argv.indexOf("--port");
const port = portIndex !== -1 ? parseInt(process.argv[portIndex + 1]) : 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
