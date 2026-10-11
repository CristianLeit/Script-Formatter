import { readInputDraft, saveFountainOutput } from './utils/fileHandler.js';
import { generateFountainScript } from './services/llmService.js';
import { compileFountainToPDF } from './parsers/pdfCompiler.js';

async function main() {
  try {
    console.log('🚀 Iniciando pipeline do ScriptFormatter AI...\n');

    // 1. Lê o rascunho em português
    const draftText = readInputDraft('input/draft.txt');
    console.log('📖 Rascunho lido do arquivo input/draft.txt');

    // 2. Processa via OpenRouter LLM
    const fountainContent = await generateFountainScript(draftText);

    // 3. Salva o arquivo .fountain
    const fountainPath = saveFountainOutput(fountainContent, 'script.fountain');

    // 4. Tenta compilar para PDF
    try {
      await compileFountainToPDF(fountainPath, 'script.pdf');
    } catch {
      console.log('ℹ️ O pipeline concluiu a parte textual. O arquivo .fountain está pronto para uso!');
    }

    console.log('\n✨ Processo finalizado com sucesso!');
  } catch (error) {
    console.error(`\n❌ Falha durante a execução: ${error.message}`);
  }
}

main();