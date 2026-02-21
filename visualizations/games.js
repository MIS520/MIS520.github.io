import { Runtime, Inspector } from "./runtime.js";
import define from "./bc3fd4f6ef58201a@106.js";

const runtime = new Runtime();

runtime.module(define, name => {
  if (name === undefined) {
    return new Inspector(document.querySelector("#observable-vis"));
  }
});