import http from "node:http";
import os from "node:os";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { appRouter, createTRPCContext } from "@ucr/trpc";

// Get the private IP of the machine
function getPrivateIP() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let alias of interfaces[iface] ?? []) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "0.0.0.0";
}

const host = getPrivateIP();
const port = 8080;

const trpcHandler = createHTTPHandler({
  router: appRouter,
  createContext: createTRPCContext,
});

http
  .createServer((req, res) => {
    trpcHandler(req, res);
  })
  .listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
