# `kvconsole.log`

`kvconsole.log` is like `console.log` but for in-place updating values (separate from clutter from test runners and HMR). Right now it only works over HTTP (most stateless client), not sockets or filesystem.

https://github.com/llllvvuu/kvconsole.log/assets/5601392/f2ea22af-90f2-485f-99ee-33436fba52a8

## Usage

```sh
pnpm install --dev @llllvvuu/kvconsole
```

Start the console program:

```sh
pnpm kvconsole # --help
```

Log to it (I've only written JavaScript/TypeScript logger for now, since HMR is really good in that ecosystem):

```javascript
import { kvconsole } from "@llllvvuu/kvconsole"
// const kvconsole = require("@llllvvuu/kvconsole").kvconsole

kvconsole.log("hello", "world")
kvconsole.log("foo", "bar")
```

The console will look like:

```text
(Press z to clear)
hello: world
foo: bar
```

If you update the file to

```javascript
kvconsole.log("two", "hard problems")
kvconsole.log("foo", "baz")
kvconsole.log("hello", "again")
```

the console will look like:

```text
(Press z to clear)
hello: world
foo: bar
two: hard problems
```

This should happen automatically if you're running in HMR mode such as [`vite-node`](https://www.npmjs.com/package/vite-node) or [`vitest`](https://github.com/vitest-dev/vitest).

## Options

`kvconsole` CLI: `-p/--port`, `-h/--host`

`kvconsole` JavaScript/Typescript library:

```typescript
import { makeKvconsole } from "@llllvvuu/kvconsole"

const kvconsole = makeKvconsole(opts /* : Opts */)

interface Opts {
  host?: string
  port?: number
  silent?: boolean
}
```
