#!/usr/bin/env node

// IMPORTS
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from './commands.js'; // Ensure these functions are defined

function main() {
  // Configure yargs
  yargs(hideBin(process.argv))
    .command(
      'add',
      'Add a new todo',
      (yargs) => {
        return yargs
          .option('title', {
            alias: 't',
            describe: 'Title of the todo',
            type: 'string',
            demandOption: true,
          })
          .option('description', {
            alias: 'd',
            describe: 'Description of the todo',
            type: 'string',
            demandOption: true,
          });
      },
      (argv) => {
        createTodo(argv.title, argv.description);
      }
    )
    .command(
      'all',
      'Retrieve all todos',
      () => {},
      () => {
        getTodos();
      }
    )
    .command(
      'get',
      'Get a todo by ID',
      (yargs) => {
        return yargs.option('id', {
          describe: 'ID of the todo',
          type: 'string',
          demandOption: true,
        });
      },
      (argv) => {
        getTodoById(argv.id);
      }
    )
    .command(
      'del',
      'Delete a todo by ID',
      (yargs) => {
        return yargs.option('id', {
          describe: 'ID of the todo to delete',
          type: 'string',
          demandOption: true,
        });
      },
      (argv) => {
        deleteTodo(argv.id);
      }
    )
    .command(
      'update',
      'Update a todo',
      (yargs) => {
        return yargs
          .option('id', {
            describe: 'ID of the todo to update',
            type: 'string',
            demandOption: true,
          })
          .option('title', {
            alias: 't',
            describe: 'New title of the todo',
            type: 'string',
            demandOption: false,
          })
          .option('description', {
            alias: 'd',
            describe: 'New description of the todo',
            type: 'string',
            demandOption: false,
          })
          .option('status', {
            alias: 's',
            describe: 'New status of the todo',
            type: 'string',
            choices: ['ACTIVE', 'DONE'],
            demandOption: false,
          });
      },
      (argv) => {
        updateTodo(
          argv.id,
          argv.title,
          argv.description,
          argv.status
        );
      }
    )
    .demandCommand(1, 'You need at least one command before moving on')
    .strict() // Ensures only valid commands are accepted
    .fail((msg, err, yargs) => {
      if (err) throw err; // preserve stack
      console.error('Invalid command:', msg);
      console.error('Use `todo --help` to see the list of available commands.');
      yargs.showHelp();
      process.exit(1);
    })
    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'v')
    .argv;
}

main();
