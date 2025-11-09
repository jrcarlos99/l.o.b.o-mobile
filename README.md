# mobile-l.o.b.o

README em português para o projeto React Native / Expo contido neste repositório.

## Visão geral

Este repositório contém um aplicativo mobile desenvolvido com Expo e TypeScript. Ele usa a estrutura padrão de pastas "app/" para telas e componentes reutilizáveis em `components/` e utilitários em `hooks/` e `constants/`.

Principais tecnologias:

- Expo (React Native)
- TypeScript

## Pré-requisitos

- Node.js (recomenda-se uma versão LTS moderna — por exemplo, 18+). Verifique com `node -v`.
- npm ou yarn
- Expo CLI (usa-se via npx, não é obrigatório instalar globalmente)
- Para rodar em emuladores: Android Studio / Xcode (macOS) ou dispositivos físicos com Expo Go.

## Instalação

Abra um terminal (PowerShell no Windows) na raiz do projeto e execute:

```powershell
# instalar dependências
npm install
# ou, se preferir yarn
# yarn install
```

## Como executar (desenvolvimento)

Inicie o servidor Metro / Expo:

```powershell
npx expo start -c
```

Isso abrirá a interface do Expo DevTools no navegador. Você pode então:

- Escanear o QR code com o aplicativo Expo Go (iOS/Android).
- Rodar em um emulador Android conectado:

```powershell
npx expo run:android
```

- Rodar em um simulador iOS (macOS):

```powershell
npx expo run:ios
```

Observações:

- Para limpar caches, use `-c` no `expo start` como mostrado.
- Se houver problemas de rede com o Expo (por exemplo, falha de conexão à API do Expo), verifique variáveis de proxy, firewall e a versão do Node.

## Estrutura do projeto (resumo)

- `app/` — telas e rotas do aplicativo (contém layouts e a navegação por tabs).
  - `_layout.tsx`, `modal.tsx`
  - `(tabs)/` — telas das abas: `create.tsx`, `index.tsx`, `occurrences.tsx`, `reports.tsx`, `settings.tsx`
- `components/` — componentes reutilizáveis (e.g. `themed-text.tsx`, `themed-view.tsx`, `ui/`)
- `data/` — mocks e dados locais (`ocorrenciasMock.ts`)
- `assets/` — imagens e outros recursos estáticos
- `constants/` — temas e constantes (`theme.ts`)
- `hooks/` — hooks personalizados (e.g. `use-theme-color.ts`)
- `scripts/` — scripts utilitários (ex: `reset-project.js`)

Arquivos de configuração:

- `app.json` — configuração do Expo
- `tsconfig.json` — configuração TypeScript
- `package.json` — scripts e dependências

## Convenções e notas de desenvolvimento

- O projeto é escrito em TypeScript; ao adicionar código, mantenha tipagens claras.
- Components reutilizáveis ficam em `components/` e componentes de interface em `components/ui/`.
- Preferir hooks existentes (`hooks/`) quando possível.

## Troubleshooting rápido

- Expo não conecta / falha na API: verifique proxy, variáveis de ambiente `HTTP_PROXY`/`HTTPS_PROXY`, e a versão do Node.
- Erros de TypeScript: execute `npx tsc --noEmit` para checar rapidamente.
- Cache estranho do Metro: reinicie com `npx expo start -c`.

## Tests / Lint

Este repositório não contém testes automatizados nem configuração de linting explícita por padrão (ou estão fora do escopo deste README). Considere adicionar ESLint e testes unitários para componentes críticos.

## Contribuição

1. Abra uma issue descrevendo a mudança/bug.
2. Crie um branch com um nome descritivo.
3. Envie um PR descrevendo a alteração e testes (se aplicável).

## Licença

Este projeto não contém uma licença explícita no repositório. Se você controla este código, adicione um arquivo `LICENSE` (por exemplo, MIT) ou atualize este README para indicar a licença apropriada.

---

Se quiser, posso:

- incluir comandos/tarefas do `package.json` (se você me mostrar o `package.json`).
- adicionar instruções de CI, lint e testes.
- traduzir para inglês ou gerar uma versão curta para abertura no GitHub.

Atualizei o arquivo `README.md` com estas informações.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
