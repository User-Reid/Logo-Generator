import inquirer from "inquirer";
import fs from "fs";
import { Circle, Triangle, Square } from "./lib/shapes.js";

const questions = [
  {
    type: "input",
    name: "text",
    message: "Enter text for the logo (up to 3 characters):",
    validate: (input) => input.length <= 3 || "Text must be up to 3 characters",
  },
  {
    type: "input",
    name: "textColor",
    message: "Enter text color (keyword or hexadecimal):",
  },
  {
    type: "list",
    name: "shape",
    message: "Choose a shape:",
    choices: ["Circle", "Triangle", "Square"],
  },
  {
    type: "input",
    name: "shapeColor",
    message: "Enter shape color (keyword or hexadecimal):",
  },
];

function generateSVG(data) {
  let shape;
  switch (data.shape) {
    case "Circle":
      shape = new Circle();
      break;
    case "Triangle":
      shape = new Triangle();
      break;
    case "Square":
      shape = new Square();
      break;
  }
  shape.setColor(data.shapeColor);

  return `
<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shape.render()}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${
      data.textColor
    }">${data.text}</text>
</svg>`;
}

function init() {
  inquirer.prompt(questions).then((answers) => {
    const svgContent = generateSVG(answers);
    fs.writeFile("logo.svg", svgContent, (err) => {
      if (err) {
        console.error("Error generating logo.svg:", err);
      } else {
        console.log("Generated logo.svg");
      }
    });
  });
}

init();
