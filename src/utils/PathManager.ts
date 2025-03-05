import path ,{ dirname } from "path";
import fs from "fs-extra";
import { input } from "@inquirer/prompts";
import { fileURLToPath } from "url";
import { promptUser } from "../cli/prompt.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function PATHconstrutcor(data: Record<string, any> = {}): Promise<{ templatePath: string; outputDir: string; data: Record<string, any> }> {
    const projectInfo = await promptUser();
    
    const templatePath = path.join(__dirname, "/templates", projectInfo.typeProject + ".ejs");
    const outputDir = path.join(projectInfo.outputDir, projectInfo.projectName + projectInfo.langProject);
    
    
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