import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import ora from "ora";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const spinner = ora();

console.log(chalk.bold.magenta("\nVerificador de Integridade de IDs\n"));

const questionDir = join(root, "questions");
const questionFiles = readdirSync(questionDir).filter((f) => f.endsWith(".json"));

const allIds = new Set();
const duplicates = [];
let totalQuestions = 0;

for (const file of questionFiles) {
    spinner.start(`Analisando ${chalk.cyan(file)}...`);
    
    const filePath = join(questionDir, file);
    let data;

    try {
        data = JSON.parse(readFileSync(filePath, "utf-8"));
        
        for (const q of data.questions) {
            totalQuestions++;
            if (allIds.has(q.id)) {
                duplicates.push({ id: q.id, file });
            } else {
                allIds.add(q.id);
            }
        }

        spinner.succeed(chalk.gray(`${chalk.white(file)}`));
    } catch (e) {
        spinner.fail(chalk.red(`Erro ao ler ${chalk.bold(file)}: ${e.message}`));
        process.exit(1);
    }
}

console.log(chalk.gray("\n" + "─".repeat(45)));

if (duplicates.length > 0) {
    console.log(chalk.red.bold(`\n❌ Falha na integridade: ${duplicates.length} duplicatas encontradas!\n`));
    
    duplicates.forEach(({ id, file }) => {
        console.log(`${chalk.red("  →")} ID: ${chalk.yellow.bold(id)} ${chalk.gray(`(em ${file})`)}`);
    });

    console.log(chalk.red(`\nA operação falhou. Corrija os IDs acima antes de prosseguir.\n`));
    process.exit(1);
} else {
    console.log(
        chalk.green.bold(`\nSucesso! `) + 
        chalk.white(`Nenhuma duplicata encontrada entre `) +
        chalk.green.bold(totalQuestions) + 
        chalk.white(` IDs verificados.\n`)
    );
}