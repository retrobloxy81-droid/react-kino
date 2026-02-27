import path from "path";
import fs from "fs-extra";
import kleur from "kleur";
import type { TemplateName } from "./prompts";

export async function createProject(
  template: TemplateName,
  projectName: string,
  createDir: boolean
): Promise<void> {
  const targetDir = createDir
    ? path.resolve(process.cwd(), projectName)
    : process.cwd();

  if (createDir) {
    if (await fs.pathExists(targetDir)) {
      const files = await fs.readdir(targetDir);
      if (files.length > 0) {
        console.log(
          kleur.red(`\n  Directory "${projectName}" already exists and is not empty.\n`)
        );
        process.exit(1);
      }
    }
    await fs.ensureDir(targetDir);
  }

  const templatesRoot = path.resolve(__dirname, "..", "templates", template);

  if (!(await fs.pathExists(templatesRoot))) {
    console.log(
      kleur.red(`\n  Template "${template}" not found at ${templatesRoot}\n`)
    );
    process.exit(1);
  }

  const files = await collectFiles(templatesRoot);

  for (const file of files) {
    const relativePath = path.relative(templatesRoot, file);
    const destPath = path.join(targetDir, relativePath);

    await fs.ensureDir(path.dirname(destPath));

    let content = await fs.readFile(file, "utf-8");
    content = content.replace(/__PROJECT_NAME__/g, projectName);

    await fs.writeFile(destPath, content, "utf-8");

    console.log(kleur.green("  \u2713") + ` Created ${relativePath}`);
  }

  console.log(kleur.bold("\n  Done! Next steps:\n"));

  if (createDir) {
    console.log(`    cd ${projectName}`);
  }

  console.log("    npm install");
  console.log("    npm run dev\n");
}

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}
