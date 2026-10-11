import dotenv from 'dotenv';
import { SYSTEM_PROMPT, buildUserPrompt } from '../prompts/scriptPrompt.js';

dotenv.config();

export async function generateFountainScript(rawText) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct:free';

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY não encontrada no arquivo .env');
  }

  console.log(`🤖 Enviando rascunho para o OpenRouter (Modelo: ${model})...`);

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://github.com/script-formatter-ai', // Opcional, exigido por algumas políticas do OpenRouter
      'X-Title': 'Script Formatter AI', // Opcional
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(rawText) }
      ],
      temperature: 0.7,
      max_tokens: 8000
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Erro na API OpenRouter (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  let content = data.choices[0]?.message?.content || '';

  // Limpeza de segurança caso a LLM insira blocos de código markdown malgré as regras
  content = content.replace(/^```fountain\s*/i, '');
  content = content.replace(/^```\s*/i, '');
  content = content.replace(/\s*```$/, '');

  return content.trim();
}