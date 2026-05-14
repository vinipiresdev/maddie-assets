# Contribuindo com o maddie-assets

Obrigado por querer contribuir! Este repositório é aberto para qualquer pessoa que queira adicionar ou corrigir perguntas do quiz da Maddie. 🧸

---

## Como contribuir

### 1. Faça um fork do repositório

Clique em **Fork** no canto superior direito do GitHub.

### 2. Clone o seu fork localmente

```bash
git clone https://github.com/SEU-USUARIO/maddie-assets.git
cd maddie-assets
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Edite o arquivo de perguntas correto

Os arquivos ficam em `questions/`:

| Arquivo | Categoria |
|---|---|
| `questions/discord.json` | Perguntas sobre o Discord |
| `questions/maddie.json` | Perguntas sobre a Maddie |

### 5. Siga as regras ao adicionar perguntas

- O `id` deve seguir o padrão `{categoria}-{número com 3 dígitos}` — ex: `discord-026`
- O número deve ser sequencial (verifique qual é o último `id` existente)
- Todas as `respostas` devem estar em **minúsculas**
- Inclua variações de resposta quando fizer sentido (ex: `"dm"` e `"direct message"`)
- A `dica` não deve entregar a resposta diretamente

#### Exemplo de pergunta bem formatada

```json
{
  "id": "discord-026",
  "question": "Qual o nome do recurso que permite criar enquetes nos canais?",
  "respostas": ["enquete", "enquetes", "poll", "polls"],
  "dica": "Uma ferramenta de votação para saber a opinião dos membros."
}
```

### 6. Valide antes de enviar

```bash
npm run validate
npm run check:duplicates
```

Se algum comando retornar erro, corrija antes de abrir o PR.

### 7. Abra um Pull Request

Crie um branch com um nome descritivo:

```bash
git checkout -b add/discord-enquete
git add questions/discord.json
git commit -m "feat: adiciona pergunta sobre enquetes (discord-026)"
git push origin add/discord-enquete
```

Depois abra o PR pelo GitHub e preencha o template.

---

## Regras gerais

- Não duplique perguntas que já existem
- Escreva em português brasileiro
- Perguntas devem ser claras e objetivas
- Evite perguntas muito obscuras ou subjetivas
- Dicas não podem revelar a resposta diretamente

---

## Dúvidas?

Abra uma [issue](../../issues) que a gente ajuda!