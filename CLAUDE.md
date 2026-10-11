# ScriptFormatter AI - Fountain & Screenplay Pipeline

## 🎯 Objetivo do Projeto
Aplicação Node.js para converter rascunhos de histórias/roteiros desestruturados em português para o formato **Fountain** em **inglês**, compilando o resultado final em um **PDF de roteiro profissional** (padrão de Hollywood / Courier 12pt).

## 🛠️ Tech Stack & Dependências
- **Runtime:** Node.js (ES Modules - `type: "module"`)
- **LLM API Provider:** OpenRouter API (`https://openrouter.ai/api/v1`)
- **SDK / Fetch:** Axios ou Native `fetch`
- **Compilador PDF:** `screenplain` (Python CLI) ou `fountain-cli` (Node.js)

## 🏗️ Arquitetura & Fluxo de Dados
1. **Input:** Arquivo `.txt` ou `.md` em `input/` com o rascunho em português.
2. **LLM Transformation:** Chamada à API OpenRouter com System Prompt estrito.
   - Tradução para o inglês (com adaptação de humor/gírias).
   - Formatação estrita na sintaxe **Fountain** (fountain.io).
3. **Fountain Intermediate:** Gravação do arquivo temporário em `output/script.fountain`.
4. **PDF Compilation:** Execução da CLI de conversão para gerar `output/script.pdf`.

## 📜 Regras do Formato Fountain (Crucial para Prompts)
- **Cabeçalhos de Cena:** Iniciam com `INT.`, `EXT.`, `INT./EXT.` em caixa alta.
- **Personagens:** Nome em CAIXA ALTA em linha isolada antes do diálogo.
- **Parentéticas:** `(instruções de atuação)` na linha imediatamente abaixo do nome do personagem.
- **Diálogo:** Texto do diálogo logo abaixo do personagem ou parentética.
- **Ação:** Parágrafos normais descrevendo a cena.
- **Transições:** `CUT TO:`, `FADE OUT.` em caixa alta e alinhados à direita (ou com `>` no Fountain).

## 💻 Comandos de Desenvolvimento
- `npm run dev` - Executa o fluxo de conversão em modo desenvolvimento.
- `npm run compile-fountain` - Compila manualmente o `.fountain` existente para `.pdf`.

## ⚙️ Regras de Código e Estilo
- Usar sintaxe ES6+ (`import/export`).
- Mudar/configurar o modelo OpenRouter via arquivo `.env`.
- Sempre tratar respostas da LLM garantindo que **não haja blocos de texto explicativo** fora do código Fountain (remover markdown codeblocks ` ```fountain ` se a IA os incluir).
- Tratar rate limits e erros de rede graciosamente devido ao uso da camada gratuita da OpenRouter.