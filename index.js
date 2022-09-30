#!/usr/bin/env node

/**
 * sql-archive
 * A CLI to archive sql tables
 *
 * @author Adeniyi Aderounmu<adeniyi.in>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const archive = require('./utils/archive');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	input.includes(`about`) && console.log(`
		The CLI tool is used to archive mysql tables.
		You need to create an archived version of the table
	`);
	input.includes(`archive`) && (await archive());

	debug && log(flags);
})();
