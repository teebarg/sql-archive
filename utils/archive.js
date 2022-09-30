const chalk = require('chalk');
const mysql = require('mysql');
const SqlString = require('sqlstring');
const ora = require('ora');
const cli = require('./cli');
const flags = cli.flags;
const { host, user, password, database, table, limit, date } = flags;

const black = chalk.hex('#000000');

module.exports = async function archive() {
	const con = mysql.createConnection({host, user, password, database});
    const spinner = ora('Running Tasks');
	con.connect(function (err) {
		if (err) {
			spinner.fail(chalk.red(err.message));
			process.exit(1);
		}
        console.log(`Archiving Table ${chalk.bgCyan.bold(black(` ${table} `))}`);
        spinner.start()

        const sql    = SqlString.format(`SELECT * FROM ${table} WHERE created <= ? LIMIT ${limit}`, [date]);
		con.query(sql, function (err, result, fields) {
			if (err) {
				spinner.fail(chalk.red(err.message));
				process.exit(1);
			} else if (result.length === 0) {
				spinner.warn(chalk.yellow(`Table ${chalk.bold(table)} is empty, aborting!!!`));
				process.exit(1);
			}
			spinner.text = `${chalk.green(`${result.length}`)} records will be archived`;
			spinner.succeed();
			const columns = fields.reduce((result, field) => {
				if (field.name != 'id') {
					result.push(field.name);
				}
				return result;
			}, []);

			const ids = [];
			const values = result.map(result => {
				const p = Object.values(result);
				ids.push(p.shift());
				return p;
			});

			const query =`INSERT INTO archived_${table} (` + SqlString.format('??', [columns]) + ') VALUES ?';
			con.query(query, [values], function (err) {
				if (err) {
                    spinner.fail(chalk.red(err.message));
					process.exit(1);
				}

				for (let index = 0; index < ids.length; index++) {
					const query = `DELETE FROM ${table} WHERE id=${ids[index]}`;
					con.query(query, function (err) {
						if (err) {
                            spinner.fail(chalk.red(err.message));
							process.exit(1);
						}
						spinner.text = `${chalk.magenta(index + 1)}). Row id ${chalk.green(`${ids[index]}`)} successfully moved`;
						spinner.succeed();
					});
				}
			});
		});
	});
};
