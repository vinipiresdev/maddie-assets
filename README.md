# maddie-assets

Repositório público de assets da **Maddie** — o bot fofo do Discord. 🧸

Aqui ficam as perguntas usadas no sistema de quiz, organizadas por categoria em JSON. Qualquer pessoa pode contribuir adicionando novas perguntas ou corrigindo as existentes via Pull Request.

---

## Estrutura

```
maddie-assets/
├── questions/
│   ├── discord.json       # Perguntas sobre o Discord
│   └── maddie.json        # Perguntas sobre a Maddie
├── schemas/
│   └── questions.schema.json   # Schema JSON para validação
├── scripts/
│   ├── validate.mjs            # Valida os JSONs contra o schema
│   └── check-duplicates.mjs    # Verifica IDs duplicados
├── .github/
│   ├── workflows/
│   │   └── validate.yml        # CI automático em todo PR
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md
└── package.json
```

---

## Categorias disponíveis

| Categoria | Arquivo | Descrição |
|---|---|---|
| `discord` | `questions/discord.json` | Perguntas sobre funcionalidades e curiosidades do Discord |
| `maddie` | `questions/maddie.json` | Perguntas sobre a própria Maddie |

---

## Como contribuir

Quer adicionar uma pergunta nova ou corrigir uma existente? Leia o [CONTRIBUTING.md](./CONTRIBUTING.md) — é bem simples!

Todo Pull Request passa por validação automática via GitHub Actions. Se o JSON tiver algum erro de estrutura ou ID duplicado, o CI vai avisar.

---

## Validação local

```bash
npm install
npm run validate          # Valida todos os JSONs contra o schema
npm run check:duplicates  # Verifica IDs duplicados entre arquivos
npm run lint              # Verifica formatação
```

---

## Licença

Este repositório é público e aberto para contribuições da comunidade.