const chalk = require('chalk');
const blue = chalk.blue;
const blueI = chalk.blue.inverse;

module.exports = info => {
	console.log(
		`\n${blueI(` DEBUG LOG `)} ${blue('')}\n`
	);

	console.log(info);
	console.log();
};

