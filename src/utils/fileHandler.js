import fs from 'fs';
import path from 'path';

export function readInputDraft(filePath = 'input/draft.txt') {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Arquivo de entrada não encontrado em: ${absolutePath}`);
  }
  return fs.readFileSync(absolutePath, 'utf-8');
}

export function saveFountainOutput(content, fileName = 'script.fountain') {
  const outputDir = path.resolve('output');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, fileName);
  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ Arquivo Fountain salvo com sucesso em: ${outputPath}`);
  return outputPath;
}