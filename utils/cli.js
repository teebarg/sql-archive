const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `Clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	host: {
		type: `string`,
		default: 'localhost',
		alias: `h`,
		desc: `Database Host`
	},
	user: {
		type: `string`,
		default: 'root',
		alias: `u`,
		desc: `Database Username`
	},
	password: {
		type: `string`,
		default: 'password',
		alias: `p`,
		desc: `Database Password`
	},
	database: {
		type: `string`,
		default: 'database',
		alias: `d`,
		desc: `Database Name`
	},
	table: {
		type: `string`,
		default: 'table',
		alias: `t`,
		desc: `Database Table to archive`
	},
	limit: {
		type: `number`,
		default: 1,
		alias: `l`,
		desc: `The records to limit the number of records`
	},
	date: {
		type: `string`,
		default: `2021-01-01`,
		alias: `z`,
		desc: `The is used to limit results to the specified date`
	},
	pem: {
		type: `string`,
		alias: `i`,
		desc: `A permission file with the database credentials`
	}
};

const commands = {
	help: { desc: `Print help info` },
	archive: { desc: `Archive table` },
	about: { desc: `Print about info` }
};

const helpText = meowHelp({
	name: `sqa`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
