import fs from "fs-extra";
import ejs from "ejs";

export async function TemplateGenerator(
  templatePath: string,
  data: Record<string, any>,
  outputPath: string
): Promise<void> {
  try {
    const templateContent = await fs.readFile(templatePath, "utf8");
    
    const renderedContent = ejs.render(templateContent, data);
    
    await fs.outputFile(outputPath, renderedContent);
    console.log(`Arquivo gerado: ${outputPath}`);
  } catch (error) {
    console.error("Erro ao gerar template:", error);
    throw error;
  }
}