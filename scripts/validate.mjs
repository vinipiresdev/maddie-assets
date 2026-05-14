import Ajv from "ajv";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import ora from "ora";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const ajv = new Ajv({ allErrors: true });
const spinner = ora();

console.log(chalk.bold.cyan("\nIniciando Validação de Questions\n"));

try {
  const schemaPath = join(root, "schemas/questions.schema.json");
  const schema = JSON.parse(readFileSync(schemaPath, "utf-8"));
  var validate = ajv.compile(schema);
} catch (e) {
  console.error(chalk.red.bold(`\n❌ Erro crítico ao carregar o Schema: ${e.message}`));
  process.exit(1);
}

const questionDir = join(root, "questions");
const questionFiles = readdirSync(questionDir).filter((f) => f.endsWith(".json"));

let hasErrors = false;
let validCount = 0;

for (const file of questionFiles) {
  spinner.start(`Validando ${chalk.blue(file)}...`);
  
  const filePath = join(root, "questions", file);
  let data;

  try {
    data = JSON.parse(readFileSync(filePath, "utf-8"));
  } catch (e) {
    spinner.fail(chalk.red(`Erro no arquivo ${chalk.bold(file)}`));
    console.error(chalk.red(`   → JSON inválido: ${e.message}\n`));
    hasErrors = true;
    continue;
  }

  const valid = validate(data);

  if (!valid) {
    spinner.fail(chalk.red(`Falha no Schema: ${chalk.bold(file)}`));
    hasErrors = true;
    
    validate.errors.forEach((err) => {
      const path = err.instancePath || "root";
      console.error(
        chalk.yellow(`     [${path}] `) + chalk.white(err.message)
      );
    });
    console.log("");
  } else {
    validCount++;
    spinner.succeed(
      chalk.green(`${chalk.bold(file)} `) + 
      chalk.gray(`(${data.questions.length} perguntas)`)
    );
  }
}

// --- Resumo Final ---
console.log(chalk.gray("\n" + "─".repeat(40)));

if (hasErrors) {
  console.log(
    chalk.red.bold(`\n Validação concluída com erros.`) + 
    chalk.white(` (${validCount}/${questionFiles.length} arquivos passaram)\n`)
  );
  process.exit(1);
} else {
  console.log(
    chalk.green.bold(`\n Sucesso total!`) + 
    chalk.white(` Todos os ${chalk.bold(validCount)} arquivos estão perfeitos.\n`)
  );
}