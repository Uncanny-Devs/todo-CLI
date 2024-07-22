# Todo CLI Tool

The `todo` CLI tool helps you manage your todos with various commands to create, retrieve, update, and delete todos. The todos are stored in a local PostgreSQL database.

## Installation

To use the `todo` CLI tool, you need to have Node.js and npm installed on your system. You can install the tool by cloning the repository and running the following commands:

```sh
git clone <repository-url>
cd <repository-directory>
npm install
npm link
npm run setDB
```

## Usage

The `todo` CLI tool supports the following commands:

### Add a New Todo

To add a new todo, use the `add` command with the `-t` (title) and `-d` (description) options.

```sh
todo add -t "Buy groceries" -d "Buy milk, eggs, and bread"
```

### Retrieve All Todos

To retrieve all todos, use the `all` command.

```sh
todo all
```

### Get a Todo by ID

To get a specific todo by its ID, use the `get` command with the `--id` option.

```sh
todo get --id <todo-id>
```

### Delete a Todo by ID

To delete a specific todo by its ID, use the `del` command with the `--id` option.

```sh
todo del --id <todo-id>
```

### Update a Todo

To update a todo, use the `update` command with the `--id` option. You can optionally provide new values for the title (`-t`), description (`-d`), and status (`-s`).

```sh
todo update --id <todo-id> -t "New Title" -d "New Description" -s "ACTIVE"
```

### Show Help

To display help information for the `todo` CLI tool, use the `--help` option.

```sh
todo --help
```

## Examples

### Adding a New Todo

```sh
$ todo add -t "Finish homework" -d "Complete the math and science assignments"
Todo added successfully.
```

### Retrieving All Todos

```sh
$ todo all
1. [ACTIVE] Buy groceries - Buy milk, eggs, and bread
2. [DONE] Finish homework - Complete the math and science assignments
```

### Getting a Todo by ID

```sh
$ todo get --id 1
[ACTIVE] Buy groceries - Buy milk, eggs, and bread
```

### Deleting a Todo by ID

```sh
$ todo del --id 1
Todo deleted successfully.
```

### Updating a Todo

```sh
$ todo update --id 2 -t "Complete homework" -d "Finish the remaining assignments" -s "DONE"
Todo updated successfully.
```

## Error Handling

If an invalid command is entered, the tool will display an error message and suggest using the `--help` option.

```sh
$ todo invalidcommand
Invalid command: invalidcommand
Use `todo --help` to see the list of available commands.
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request. We appreciate all contributions!