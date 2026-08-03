const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@hexasecure.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "hexasecure-admin-token";

const publicFolder = __dirname;
const dataFolder = path.join(__dirname, "data");
const contactFile = path.join(dataFolder, "contact-messages.json");
const requestsFile = path.join(dataFolder, "service-requests.json");

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", function (chunk) {
      body += chunk;

      if (body.length > 1000000) {
        reject(new Error("Request body is too large."));
      }
    });

    request.on("end", function () {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Invalid JSON."));
      }
    });
  });
}

function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileData = fs.readFileSync(filePath, "utf8");
  return fileData ? JSON.parse(fileData) : [];
}

function saveJsonFile(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function addRecord(filePath, record) {
  const records = readJsonFile(filePath);
  const savedRecord = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...record
  };

  records.unshift(savedRecord);
  saveJsonFile(filePath, records);
  return savedRecord;
}

function isMissing(value) {
  return !value || String(value).trim() === "";
}

function isAdmin(request) {
  return request.headers.authorization === `Bearer ${ADMIN_TOKEN}`;
}

async function handleApi(request, response, pathname) {
  if (request.method === "POST" && pathname === "/api/contact") {
    const body = await readBody(request);

    if (isMissing(body.name) || isMissing(body.email) || isMissing(body.message)) {
      sendJson(response, 400, { message: "Name, email, and message are required." });
      return;
    }

    addRecord(contactFile, {
      name: body.name,
      email: body.email,
      service: body.service || "Not selected",
      message: body.message
    });

    sendJson(response, 201, { message: "Thank you! Your message has been received." });
    return;
  }

  if (request.method === "POST" && pathname === "/api/service-requests") {
    const body = await readBody(request);

    if (isMissing(body.name) || isMissing(body.email) || isMissing(body.service) || isMissing(body.message)) {
      sendJson(response, 400, { message: "Name, email, service, and project description are required." });
      return;
    }

    addRecord(requestsFile, {
      name: body.name,
      email: body.email,
      phone: body.phone || "Not provided",
      service: body.service,
      budget: body.budget || "Not decided yet",
      message: body.message
    });

    sendJson(response, 201, { message: "Thank you! Your service request has been received." });
    return;
  }

  if (request.method === "POST" && pathname === "/api/admin/login") {
    const body = await readBody(request);

    if (body.email === ADMIN_EMAIL && body.password === ADMIN_PASSWORD) {
      sendJson(response, 200, {
        message: "Login successful.",
        token: ADMIN_TOKEN
      });
      return;
    }

    sendJson(response, 401, { message: "Invalid admin email or password." });
    return;
  }

  if (request.method === "GET" && pathname === "/api/admin/data") {
    if (!isAdmin(request)) {
      sendJson(response, 401, { message: "Unauthorized admin request." });
      return;
    }

    sendJson(response, 200, {
      contacts: readJsonFile(contactFile),
      serviceRequests: readJsonFile(requestsFile)
    });
    return;
  }

  sendJson(response, 404, { message: "API route not found." });
}

function serveStaticFile(response, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const requestedPath = path.normalize(decodeURIComponent(safePath)).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicFolder, requestedPath);

  if (!filePath.startsWith(publicFolder)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, function (error, content) {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Page not found.");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, { "Content-Type": mimeTypes[extension] || "application/octet-stream" });
    response.end(content);
  });
}

const server = http.createServer(async function (request, response) {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  try {
    if (requestUrl.pathname.startsWith("/api/")) {
      await handleApi(request, response, requestUrl.pathname);
      return;
    }

    serveStaticFile(response, requestUrl.pathname);
  } catch (error) {
    sendJson(response, 500, { message: error.message || "Server error." });
  }
});

server.listen(PORT, function () {
  console.log(`HexaSecure backend is running at http://localhost:${PORT}`);
  console.log(`Admin email: ${ADMIN_EMAIL}`);
  console.log(`Admin password: ${ADMIN_PASSWORD}`);
});
