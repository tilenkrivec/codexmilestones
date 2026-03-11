#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PACKAGE_JSON = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const SKILLS_ROOT = path.join(ROOT, 'skills');
const AGENTS_TEMPLATE_PATH = path.join(ROOT, 'templates', 'AGENTS.workflow.md');
const MANIFEST_FILE = '.codexmilestones.json';
const START_MARKER = '<!-- codexmilestones:workflow:start -->';
const END_MARKER = '<!-- codexmilestones:workflow:end -->';

main(process.argv.slice(2));

function main(argv) {
  const [command = 'help', ...rest] = argv;
  const options = parseOptions(rest);

  if (options.help || command === 'help') {
    printHelp();
    return;
  }

  if (command === 'install') {
    installCommand(options);
    return;
  }

  if (command === 'check') {
    checkCommand(options);
    return;
  }

  if (command === 'update') {
    updateCommand(options);
    return;
  }

  fail(`Unknown command: ${command}`);
}

function parseOptions(args) {
  const options = {
    target: process.cwd(),
    skills: null,
    force: false,
    agents: true,
    help: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--force') {
      options.force = true;
      continue;
    }

    if (arg === '--no-agents') {
      options.agents = false;
      continue;
    }

    if (arg === '--target' || arg === '-t') {
      options.target = path.resolve(args[i + 1] ?? '.');
      i += 1;
      continue;
    }

    if (arg.startsWith('--target=')) {
      options.target = path.resolve(arg.split('=')[1]);
      continue;
    }

    if (arg === '--skills' || arg === '-s') {
      options.skills = parseSkills(args[i + 1]);
      i += 1;
      continue;
    }

    if (arg.startsWith('--skills=')) {
      options.skills = parseSkills(arg.split('=')[1]);
      continue;
    }

    fail(`Unknown option: ${arg}`);
  }

  return options;
}

function installCommand(options) {
  const target = path.resolve(options.target);
  const availableSkills = listAvailableSkills();
  const selectedSkills = options.skills ?? availableSkills;

  assertTargetSkills(selectedSkills, availableSkills);
  ensureDir(target);

  const targetSkillsRoot = path.join(target, '.agents', 'skills');
  ensureDir(targetSkillsRoot);

  for (const skill of selectedSkills) {
    const source = path.join(SKILLS_ROOT, skill);
    const destination = path.join(targetSkillsRoot, skill);
    rmSync(destination, { recursive: true, force: true });
    cpSync(source, destination, { recursive: true });
  }

  if (options.agents) {
    syncAgentsBlock(target);
  }

  const manifest = {
    tool: 'codexmilestones',
    source: 'github:tilenkrivec/codexmilestones',
    version: PACKAGE_JSON.version,
    installedSkills: selectedSkills,
    agentsBlockInstalled: options.agents,
    updatedAt: new Date().toISOString(),
  };

  writeJson(path.join(target, MANIFEST_FILE), manifest);

  console.log(`Installed codexmilestones ${PACKAGE_JSON.version} into ${target}`);
  console.log(`Skills: ${selectedSkills.join(', ')}`);
  console.log(`AGENTS block: ${options.agents ? 'updated' : 'skipped'}`);
}

function checkCommand(options) {
  const target = path.resolve(options.target);
  const manifestPath = path.join(target, MANIFEST_FILE);

  if (!existsSync(manifestPath)) {
    fail(`No ${MANIFEST_FILE} found in ${target}. Run install first.`);
  }

  const manifest = readJson(manifestPath);
  const upToDate = manifest.version === PACKAGE_JSON.version;

  console.log(`Target: ${target}`);
  console.log(`Installed version: ${manifest.version}`);
  console.log(`Current CLI version: ${PACKAGE_JSON.version}`);
  console.log(`Installed skills: ${manifest.installedSkills.join(', ')}`);
  console.log(`AGENTS block installed: ${manifest.agentsBlockInstalled ? 'yes' : 'no'}`);
  console.log(`Status: ${upToDate ? 'up to date' : 'update available'}`);
}

function updateCommand(options) {
  const target = path.resolve(options.target);
  const manifestPath = path.join(target, MANIFEST_FILE);

  if (!existsSync(manifestPath)) {
    fail(`No ${MANIFEST_FILE} found in ${target}. Run install first.`);
  }

  const manifest = readJson(manifestPath);
  installCommand({
    ...options,
    target,
    skills: options.skills ?? manifest.installedSkills,
    agents: options.agents && manifest.agentsBlockInstalled,
  });
}

function syncAgentsBlock(target) {
  const agentsPath = path.join(target, 'AGENTS.md');
  const blockBody = readFileSync(AGENTS_TEMPLATE_PATH, 'utf8').trim();
  const managedBlock = `${START_MARKER}\n${blockBody}\n${END_MARKER}`;

  if (!existsSync(agentsPath)) {
    writeFileSync(agentsPath, `${managedBlock}\n`, 'utf8');
    return;
  }

  const current = readFileSync(agentsPath, 'utf8');
  const markerPattern = new RegExp(`${escapeRegExp(START_MARKER)}[\\s\\S]*?${escapeRegExp(END_MARKER)}`, 'm');

  if (markerPattern.test(current)) {
    writeFileSync(agentsPath, current.replace(markerPattern, managedBlock), 'utf8');
    return;
  }

  const trimmed = current.replace(/\s+$/, '');
  writeFileSync(agentsPath, `${trimmed}\n\n${managedBlock}\n`, 'utf8');
}

function listAvailableSkills() {
  return ['quick', 'milestone'];
}

function assertTargetSkills(selectedSkills, availableSkills) {
  const invalid = selectedSkills.filter((skill) => !availableSkills.includes(skill));
  if (invalid.length > 0) {
    fail(`Unknown skills: ${invalid.join(', ')}`);
  }
}

function parseSkills(raw) {
  if (!raw || raw === 'all') {
    return listAvailableSkills();
  }

  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function ensureDir(dirPath) {
  mkdirSync(dirPath, { recursive: true });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function printHelp() {
  console.log(`codexmilestones ${PACKAGE_JSON.version}

Usage:
  codexmilestones install [--target <path>] [--skills quick,milestone] [--no-agents]
  codexmilestones check [--target <path>]
  codexmilestones update [--target <path>] [--skills quick,milestone]

Options:
  -t, --target   Target repository path. Defaults to the current directory.
  -s, --skills   Comma-separated skill list. Defaults to all shared skills.
      --no-agents  Skip AGENTS workflow block installation during install.
      --help     Show this help message.
`);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
