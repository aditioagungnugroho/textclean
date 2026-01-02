#!/usr/bin/env node

import { clean } from "../src/index.js";
import fs from "fs";

// Simple argument parsing
const args = process.argv.slice(2);
let input = "";

if (args.length > 0 && args[0] !== "-") {
  // Read from file
  try {
    input = fs.readFileSync(args[0], "utf8");
    processInput(input);
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
  }
} else {
  // Read from stdin
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    input += chunk;
  });
  process.stdin.on("end", () => {
    processInput(input);
  });
}

function processInput(text) {
  // TODO: Parse flags from args if needed
  const result = clean(text);
  process.stdout.write(result);
}
