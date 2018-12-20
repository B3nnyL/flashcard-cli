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

export function successRes(text: string): string {
  const greenText = color(text, 'green')
  return `✅   ${greenText}`;
}

export function failedRes(text: string): string {
  const redText = color(text, 'red')
  return `❌  ${redText}`;
}

export function frontRes(front: string): string {
  return color(front, 'cyan');
}

export function backRes(back: string): string {
  return color(back, 'cyan')
}
