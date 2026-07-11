## tests-frontend-tool

- Este projeto é um front separado em JavaScript puro, com Expo/Metro como padrão.
- Não reintroduzir TypeScript, Vite ou HTML manual.
- A fonte de configuração local é `config/env.local.js`, com `config/env.local.sample` como template.
- O app consome `GET /tests` e artefatos autenticados com `X-API-KEY`.
- O índice público chega com `types[]` e `suites[]`; a interface deve separar browser smoke, phpunit e outros tipos.
- O dashboard deve continuar read-only; a execução dos smoke tests fica no backend.
- Sempre manter a UI dividida em blocos pequenos e reutilizáveis.
- Qualquer alteração visível no browser deve continuar funcionando em `expo export --platform web`.
