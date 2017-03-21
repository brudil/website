import fs from 'fs';
import throttle from 'lodash/throttle';
import isObject from 'lodash/isObject';
import chalk from 'chalk';
import ncp from 'copy-paste';
import assets from '../webpack-assets.json';
import manifest from '../dist/manifest.json';
import * as ui from './generator/ui';
import { createChangesGenerator } from './generator/changes';
import { renderTemplates, renderPages } from './generator/rendering';
import config from './setup';

assets.manifest = manifest;

function doDiff(next, previous) {
  const dirtyTemplates = [];
  const dirtyPages = [];

  Object.keys(next.templates).forEach((templateName) => {
    const nextTemplate = next.templates[templateName];
    const previousTemplate = previous.templates[templateName];
    if (previousTemplate === undefined) {
      dirtyTemplates.push({ name: templateName, isNew: true });
    } else {
      const dirtyHead = nextTemplate.head !== previousTemplate.head;
      const dirtyTemplateLoggedIn = nextTemplate.templateLoggedIn !== previousTemplate.templateLoggedIn;
      const dirtyTemplatePublic = nextTemplate.templatePublic !== previousTemplate.templatePublic;
      if (dirtyHead || dirtyTemplateLoggedIn || dirtyTemplatePublic) {
        dirtyTemplates.push({ name: templateName, dirtyHead, dirtyTemplateLoggedIn, dirtyTemplatePublic });
      }
    }
  });

  Object.keys(next.pages).forEach((pageName) => {
    if (!Object.hasOwnProperty.call(previous.pages, pageName) || next.pages[pageName].content !== previous.pages[pageName].content) {
      dirtyPages.push(pageName);
    }
  });

  return { dirtyTemplates, dirtyPages };
}

const next = {
  templates: renderTemplates(config.templates, assets),
  pages: renderPages(config.pages, assets),
};


let previousFile;

try {
  const file = fs.readFileSync('./previous.json', { encoding: 'utf-8', flag: 'r+' });
  previousFile = JSON.parse(file);
} catch (e) {
  previousFile = { templates: {}, pages: {} };
}

if (!isObject(previousFile)) {
  previousFile = {};
}

previousFile = { templates: {}, pages: {}, ...previousFile };


function saveState(state) {
  fs.writeFileSync('./previous.json', JSON.stringify(state), { encoding: 'utf-8' });
}

const differences = doDiff(next, previousFile);

function differencesUI(differences) {
  // exit if nothing
  if (differences.dirtyTemplates.length <= 0 && differences.dirtyPages.length <= 0) {
    console.log(`${chalk.red('No changes!')}. Use ${chalk.blue('-f')} to force all, ${chalk.blue('-p')} to name pages and ${chalk.blue('-t')} for templates`);
    return;
  }

  ui.renderDifferencesList(differences);


  console.log('Press enter to start.');

  const stdin = process.openStdin();
  const changes = createChangesGenerator(differences, next);

  function nextAction() {
    const change = changes.next();
    if (change && change.done) {
      console.log('All done!');
      saveState(next);
      console.log(chalk.green('Saved to state file. 👍'));
      process.exit(0);
    }

    const { type, name, part, content } = change.value;
    ncp.copy(content, () => {
      if (type === 'template') {
        console.log(`📋  ${chalk.underline('Template')} ${chalk.blue(name)}: ${chalk.green(part)}. ${chalk.italic('Paste away!')}`);
      } else if (type === 'page') {
        console.log(`📋  ${chalk.underline('Page')} ${chalk.blue(name)}.  ${chalk.italic('Paste away!')}`);
      }
    });
  }

  nextAction();
  stdin.on('data', throttle(nextAction, 300));
}

differencesUI(differences);
