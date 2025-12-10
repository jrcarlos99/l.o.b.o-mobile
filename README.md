# l.o.b.o-mobile

Aplicativo mobile (React Native + Expo Router) com TypeScript para o projeto L.O.B.O.

![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)

Este README foi atualizado para refletir as mudanças realizadas até Dez/2025, com foco na refatoração completa do módulo de Ocorrências e melhorias na estrutura do projeto.

## Visão Geral

- Expo (React Native) + TypeScript
- Router baseado em arquivos (pasta `app/`)
- Módulo de Ocorrências totalmente reestruturado, integrado ao Supabase (PostgreSQL + Storage)
- Componentização, validação com Yup e gerenciamento de formulários com Formik

## Pré-requisitos

- Node.js LTS (recomendado 18+). Verifique com `node -v`.
- npm (ou yarn)
- Android Studio (emulador) e/ou dispositivo físico com Expo Go
- Credenciais/variáveis de ambiente para Supabase (se aplicável)

## Instalação

```powershell
npm install
```

## Executar em Desenvolvimento

```powershell
# iniciar servidor Expo com limpeza de cache
npx expo start -c

# rodar no emulador Android
npx expo run:android

# (macOS) rodar no simulador iOS
npx expo run:ios
```

## Ambiente (variáveis necessárias)

Defina variáveis de ambiente para que as integrações funcionem corretamente. Não inclua seus valores neste README.

- `SUPABASE_URL` — URL do seu projeto Supabase
- `SUPABASE_ANON_KEY` — chave pública (anon) do Supabase
- Outras variáveis específicas do projeto podem ser necessárias conforme os serviços em `services/`.

Exemplo de arquivo `.env` (apenas como referência, sem valores reais):

```bash
# .env
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

## Scripts Úteis (`package.json`)

- `reset-project`: reorganiza o projeto de exemplo para uma estrutura limpa
- Outros scripts padrão do Expo podem estar disponíveis; veja `package.json`

## Principais Mudanças (desde a criação do README)

- Refatoração completa do módulo de Ocorrências com arquitetura modular
- Criação de 12 arquivos novos (components, hooks, validation, utils)
- Adição das dependências: `formik` e `react-native-toast-message`
- Validação centralizada com Yup e formulários com Formik
- Upload de imagens e assinaturas via Supabase Storage
- Integração com tabelas `ocorrencias` e `ocorrencia_anexos`

Para detalhes, consulte `RELATORIO_ALTERACOES.md` e `SUMARIO_EXECUTIVO.md`.

## Estrutura do Projeto (atualizada)

- `app/`
  - `_layout.tsx` (layout global)
  - `index.tsx`, `login.tsx`, `dashboard.tsx`, etc.
  - `occurrences/`
    - `_layout.tsx` (Stack)
    - `create.tsx` (tela principal de registro de ocorrência)
- `components/`
  - `occurrences/`
    - `HeaderSection.tsx`, `FormSection.tsx`, `ImageSection.tsx`, `SignatureSection.tsx`, `index.ts`
  - `ui/`, `Header/`, `occurrence/`, etc.
- `hooks/`
  - `occurrences/`
    - `useOccurrencePickers.ts`, `useOccurrenceUploads.ts`, `index.ts`
  - Autenticação, GPS, Permissões, Foto, Vídeo, etc.
- `validation/`
  - `occurrences/`
    - `occurrenceSchema.ts`, `index.ts`
- `utils/`
  - `uploadImageToSupabase.ts`, `supabase.ts`
- `services/` (auth, occurrences, dashboard, notification)
- `store/` (estado de autenticação, etc.)
- `styles/` (estilos por módulo e telas)
- `schema/` (schemas por tipo de ocorrência)
- `scripts/` (`reset-project.js`, `notifications.ts`)

## Ocorrências: Fluxo e Arquitetura

- Orquestração na tela `app/occurrences/create.tsx`
- Componentes estruturados: Header, Form, Imagens, Assinatura
- Hooks dedicados:
  - `useOccurrencePickers`: carrega viaturas/equipes em paralelo
  - `useOccurrenceUploads`: upload de imagens e assinatura
- Validação: `validation/occurrences/occurrenceSchema.ts`
- Persistência: Supabase (DB e Storage bucket `anexos`)

## Dependências Adicionadas

- `formik` — gerenciamento de formulários
- `react-native-toast-message` — feedback de UI não-bloqueante

Instalação já coberta por `npm install`.

## Convenções

- TypeScript em todo o app; mantenha tipagens consistentes
- Componentes reutilizáveis em `components/` e estilos em `styles/`
- Hooks para lógica reutilizável em `hooks/`

## Checklist de Primeiro Uso

- Instalar dependências: `npm install`
- Configurar variáveis de ambiente (sem expor valores): `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- Executar: `npx expo start -c`
- Testar fluxo de Ocorrências na tela `app/occurrences/create.tsx`

## Troubleshooting

- Expo sem conectar: verifique firewall/proxy (`HTTP_PROXY`/`HTTPS_PROXY`) e versão do Node
- TypeScript: `npx tsc --noEmit` para checagem rápida
- Metro cache: `npx expo start -c`

## Contribuição

- Abra uma issue descrevendo a mudança/bug
- Crie um branch descritivo
- Envie um PR com descrição e evidências (prints/logs)
