# ScriptFormatter AI

Pipeline Node.js para converter rascunhos de roteiro (pt-BR) → Fountain (en) → PDF (Hollywood/Courier 12pt).

## Uso

```bash
npm start
```

Requer `.env` com `OPENROUTER_MODEL` e `OPENROUTER_API_KEY`.

## Etapas

1. `input/draft.txt` — rascunho
2. LLM (OpenRouter) — tradução + formatação Fountain
3. `output/script.fountain` — intermediário
4. `pdfCompiler.js` — compilação para PDF

Modelo usado (gratuito): `meta-llama/llama-3.1-8b-instruct`
