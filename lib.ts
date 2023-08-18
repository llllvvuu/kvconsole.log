import crossFetch from "cross-fetch"

interface KvconsoleClientOpts {
  /** @defaultValue "localhost" */
  host?: string
  /** @defaultValue 4269 */
  port?: number
  /** whether to suppress error output for connection errors */
  silent?: boolean
}

interface KvConsoleClient {
  /** @example kvconsole.log("hello", "world") */
  log: (key: unknown, value: unknown) => void | Promise<void>
}

function fallbackLog(payload: string): void {
  console.log("[kvconsole] falling back to console.log:", payload)
}

/**
 * @example `const kvconsole = makeKvConsole({ host: "localhost", port: 6969 }); kvconsole.log("hello", "world")`
 * @see `kvconsole` for default options
 */
export function makeKvconsole(opts?: KvconsoleClientOpts): KvConsoleClient {
  const host = opts?.host || "localhost"
  const port = opts?.port || 4269
  const baseURL = `http://${host}:${port}`

  async function fetchLogger(key: unknown, value: unknown) {
    const payload = JSON.stringify({
      [JSON.stringify(key)]: JSON.stringify(value),
    })

    try {
      const response = await crossFetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      })

      if (!response.ok && !opts?.silent) {
        console.error(
          `[kvconsole] responded with HTTP error code: ${response.status}`,
        )
        fallbackLog(payload)
      }
    } catch (fetchError) {
      if (!opts?.silent) {
        console.error("[kvconsole] connection error:", fetchError)
        fallbackLog(payload)
      }
    }
  }

  return { log: fetchLogger }
}

/** `kvconsole` with default options */
export const kvconsole = makeKvconsole()
