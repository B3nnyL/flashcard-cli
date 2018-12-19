import * as boxen from "boxen";
import * as wrapAnsi from "wrap-ansi";
import {default as chalk } from "chalk";

export function color(input: string, color: string):string {
  return chalk[color](input);
}

export function inBox(coloredText, textWidth) {
  const boxenConig = { padding: 4, margin: 4, borderStyle: "double" };
  console.log(boxen(wrapAnsi(coloredText, textWidth), boxenConig));
}