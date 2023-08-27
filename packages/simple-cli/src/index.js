
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command(
    ['copy'],
    'Copy a new template from local file',
    (argv) => {
      import('./copy/index.js').then(({ default: parseAnswer }) => {
        parseAnswer(argv);
      });
    }
  )
  .command(
    ['create', 'c'],
    'Create a new template from Git repo',
    (yargs) => {
      return yargs.option('name', {
        alias: 'n',
        demand: false,
        describe: 'Template name',
        type: 'string'
      }).option('force', {
        alias: 'f',
        demand: false,
        describe: 'overwrite target directory if it is existed',
        type: 'boolean'
      })
    },
    (argv) => {
      import('./create/index.js').then(({ default: create }) => {
        create(argv.name, argv);
      });
    }
  )
  .command(
    ['use'],
    'Some Command Interpretation',
    (argv) => {
      import('./help/index.js').then(({ default: help }) => {
        help(argv);
      });
    }
  )
  .parse()