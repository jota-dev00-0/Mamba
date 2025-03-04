import { input, expand, select } from "@inquirer/prompts";
import chalk from "chalk";
import fs from "fs-extra";
import ejs from "ejs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Define __dirname para módulos ES
const __dirname = dirname(fileURLToPath(import.meta.url));

function welcomeToApp() {
  console.log(chalk.bgGreen.white("Seja Bem-vindo(a) ao Gerador de Boilerplates \n"));
}

interface PromptModel {
  projectName: string;
  outputDir: string;
  typeProject: string;
  langProject: string;
}

async function promptUser(): Promise<PromptModel> {
  const projectName = await input({
    message: "Digite o nome do seu projeto:",
    validate: (input: string) => input.trim() !== "" || "Nome do projeto não pode ser vazio."
  });

  const outputDir = await input({
    message: "Digite o diretório de saída do seu projeto:",
    default: "./output",
    validate: (input: string) => input.trim() !== "" || "O diretório não pode ser vazio."
  });

  const typeProject = await select({
    message: "Escolha o tipo de template:",
    choices: [
      {   
        name: "API",
        value: "API",
        description: "API com express"
      },
      {
        name: "API fast",
        value: "FAST-API",
        description: "API com fastify"
      }
    ]
  });
  
  const langProject = await expand({
    message: "Qual Lang deseja usar:",
    choices: [
      { key: "a", name: "JavaScript", value: ".js" },
      { key: "b", name: "TypeScript", value: ".ts" }
    ]
  });

  return { projectName, outputDir, typeProject, langProject };
}

async function TemplateGenerator(
  templatePath: string,
  data: Record<string, any>,
  outputPath: string
): Promise<void> {
  try {
    const templateContent = await fs.readFile(templatePath, "utf8");
    // Renderiza o conteúdo do template com os dados informados
    const renderedContent = ejs.render(templateContent, data);
    // Cria o arquivo de saída com o conteúdo renderizado
    await fs.outputFile(outputPath, renderedContent);
    console.log(`Arquivo gerado: ${outputPath}`);
  } catch (error) {
    console.error("Erro ao gerar template:", error);
    throw error;
  }
}

async function PATHconstrutcor(data: Record<string, any> = {}): Promise<{ templatePath: string; outputDir: string; data: Record<string, any> }> {
  const projectInfo = await promptUser();
  // Constrói os caminhos com base nas informações do usuário
  const templatePath = path.join(__dirname, "/templates", projectInfo.typeProject + ".ejs");
  const outputDir = path.join(projectInfo.outputDir, projectInfo.projectName + projectInfo.langProject);
  
  // Corrigindo a validação para os tipos "API" ou "FAST-API"
  if (projectInfo.typeProject === "API" || projectInfo.typeProject === "FAST-API") {
    const portString = await input({
      message: "Digite a Porta da Sua API:",
      validate: (input: string) => input.trim() !== "" || "Não pode ser vazio"
    });
    const port = parseInt(portString, 10);
    data = {
      ...data,
      port: isNaN(port) ? 3000 : port,
      projectName: projectInfo.projectName,
      langProject: projectInfo.langProject
    };
  }
  
  return { templatePath, outputDir, data };
}

async function startApp() {
  welcomeToApp();
  // Obtém os dados do usuário e os caminhos de template e output
  const { templatePath, outputDir, data } = await PATHconstrutcor();
  
  // Exemplo de uso: gera o arquivo "index" com a extensão escolhida
  
  
  await TemplateGenerator(templatePath, data, outputDir);
}

startApp();
