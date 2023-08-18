#!/bin/sh

tsc -p tsconfig.esm.json
tsc -p tsconfig.cjs.json

for file in dist/esm/*.js; do mv -- "$file" "${file%.js}.mjs"; done
for file in dist/esm/*.ts; do mv -- "$file" "${file%.ts}.mts"; done

for file in dist/cjs/*.js; do mv -- "$file" "${file%.js}.cjs"; done
for file in dist/cjs/*.ts; do mv -- "$file" "${file%.ts}.cts"; done
