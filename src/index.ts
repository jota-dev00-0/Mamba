
import chalk from "chalk";
import { TemplateGenerator } from "./core/templateGenerator.js";
import { PATHconstrutcor } from "./utils/PathManager.js";

function welcomeToApp() {
  console.log(chalk.bgGreen.white("Seja Bem-vindo(a) ao Gerador de Boilerplates \n"));
}

async function startApp() {
  welcomeToApp();
  
  const { templatePath, outputDir, data } = await PATHconstrutcor();
  
  await TemplateGenerator(templatePath, data, outputDir);
}

startApp();
