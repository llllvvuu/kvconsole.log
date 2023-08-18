#!/usr/bin/env node

import { createServer } from "http"
import { program } from "commander"
import * as readline from "readline"

program
  .option("-p, --port <type>", "Port to listen on", "4269")
  .option("-h, --host <type>", "Host to bind to", "localhost")

program.parse(process.argv)
const options = program.opts()
const host = options["host"] ?? "localhost"
const port = options["port"] ?? "4269"

let logs: Record<string, string> = {}
const server = createServer(async (req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    "Content-Type": "text/plain",
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers)
    res.end()
    return
  }

  if (req.method === "POST") {
    let body = ""
    req.on("data", chunk => (body += chunk))
    req.on("end", () => {
      const data = JSON.parse(body)
      let hasNewLogs = false
      Object.entries(data).forEach(([k, v]) => {
        if (logs[k] !== v) {
          hasNewLogs = true
          logs[k] = v as string
        }
      })

      if (hasNewLogs) {
        displayLogs()
      }

      res.writeHead(200, headers)
      res.end()
    })
  } else {
    res.writeHead(405, headers)
    res.end(`${req.method} Method Not Allowed`)
  }
})

function displayLogs() {
  console.clear()
  console.log(`kvconsole listening on ${host}:${port}`)
  console.log("(Press z to clear)")
  Object.entries(logs).forEach(([k, v]) => {
    console.log(`${k}:`, v)
  })
}

server.listen(port, host, () => {
  displayLogs()
})

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on("keypress", (_, key) => {
  if (key.ctrl && key.name === "c") {
    process.exit()
  } else if (key.name === "z") {
    logs = {}
    displayLogs()
  }
})
