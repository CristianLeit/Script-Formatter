import { exec } from 'child_process';
import path from 'path';

export function compileFountainToPDF(fountainPath = 'output/script.fountain', pdfName = 'script.pdf') {
  return new Promise((resolve, reject) => {
    const pdfPath = path.join(path.dirname(fountainPath), pdfName);
    const command = `screenplain "${fountainPath}" "${pdfPath}"`;

    console.log(`⚙️ Compilando PDF usando Screenplain...`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.warn(`⚠️ Erro ao executar screenplain automaticamente (${error.message}).`);
        console.warn(`💡 Verifique se o screenplain está instalado com: pip install "screenplain[pdf]"`);
        console.warn(`📄 O arquivo .fountain foi gerado e pode ser aberto manualmente no Fade In ou WriterDuet.`);
        return reject(error);
      }
      console.log(`🎉 PDF de Roteiro gerado com sucesso em: ${pdfPath}`);
      resolve(pdfPath);
    });
  });
}