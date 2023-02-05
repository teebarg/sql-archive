const chalk = require('chalk');
const mysql = require('mysql');
const ora = require('ora');
const cli = require('./cli');
const readPermission = require('./readPerm');
const flags = cli.flags;
const { host, user, password, database, table, limit, date, pem } = flags;

const black = chalk.hex('#000000');

module.exports = async function archive() {
	const credentials = pem ? await readPermission(pem) : ({ host, user, password, database });

	const connection = mysql.createConnection(credentials);
	const spinner = ora('Running Tasks.....');
	connection.connect(function (err) {
		if (err) {
			spinner.fail(chalk.red(err.message));
			process.exit(1);
		}
		console.log(chalk.green.bold('Connected to the database.'));
		console.log(
			`Archiving items in Table ${chalk.bgCyan.bold(
				black(` ${table} `)
			)} created before ${chalk.cyan.bold(date)} limit ${chalk.red.bold(limit)}`
		);
		console.log();
		spinner.start();

		// Get the column names from the table
		connection.query(`DESCRIBE ${table}`, function (err, result) {
			if (err) {
				spinner.fail(chalk.red(err.message));
				process.exit(1);
			}

			const columnNames = result.map(column => column.Field).join(', ');
			const insertQuery = `INSERT IGNORE INTO archived_${table} (${columnNames}) SELECT * FROM ${table} WHERE created < ${connection.escape(
				date
			)} LIMIT ${limit}`;
			const deleteQuery = `DELETE FROM ${table} WHERE created < ${connection.escape(
				date
			)} LIMIT ${limit}`;

			connection.beginTransaction(function (err) {
				if (err) {
					spinner.fail(chalk.red(err.message));
					process.exit(1);
				}

				connection.query(insertQuery, function (err, result) {
					if (err) {
						connection.rollback(function () {
							spinner.fail(chalk.red(err.message));
							process.exit(1);
						});
					}

					if (!result) {
						spinner.fail(chalk.red('No records to archive!!!'));
						process.exit(1);
					}
					console.log();
					console.log(
						`DB Response: ${chalk.bold.magenta(result.message)}`
					);

					spinner.text = `Moved ${chalk.green(
						result.affectedRows
					)} rows to ${chalk.yellow(`archived_${table}`)}.`;
					spinner.succeed();

					connection.query(deleteQuery, function (err, result) {
						if (err) {
							connection.rollback(function () {
								spinner.fail(chalk.red(err.message));
								process.exit(1);
							});
						}
						if (!result) {
							spinner.fail(
								chalk.red('Records cannot be deleted!!!')
							);
							process.exit(1);
						}

						spinner.text = `Deleted ${chalk.red(
							result.affectedRows
						)} rows from ${chalk.yellow(`${table}`)}.`;
						spinner.succeed();

						connection.commit(function (err) {
							if (err) {
								connection.rollback(function () {
									spinner.fail(chalk.red(err.message));
									process.exit(1);
								});
							}
							console.log(
								chalk.bold.green('Transaction complete.')
							);
							connection.end();
						});
					});
				});
			});
		});
	});
};
