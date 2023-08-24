#!/bin/sh

rimraf dist

tsc -p tsconfig.esm.json
tsc -p tsconfig.cjs.json

for file in dist/esm/*.js; do mv -- "$file" "${file%.js}.mjs"; done
for file in dist/esm/*.ts; do mv -- "$file" "${file%.ts}.mts"; done
for file in dist/esm/*.d.ts.map; do
  sed -e 's/\.d\.ts/.d.mts/g' "$file" > "$file.bak"
  mv -- "$file.bak" "$file"
done

for file in dist/cjs/*.js; do mv -- "$file" "${file%.js}.cjs"; done
for file in dist/cjs/*.ts; do mv -- "$file" "${file%.ts}.cts"; done
for file in dist/cjs/*.d.ts.map; do
  sed -e 's/\.d\.ts/.d.cts/g' "$file" > "$file.bak"
  mv -- "$file.bak" "$file"
done
