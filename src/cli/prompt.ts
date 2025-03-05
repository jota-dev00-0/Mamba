import { input, select , expand } from "@inquirer/prompts";



interface PromptModel {
    projectName: string;
    outputDir: string;
    typeProject: string;
    langProject: string;
  }
  
export async function promptUser(): Promise<PromptModel> {
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