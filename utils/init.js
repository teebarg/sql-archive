const welcome = require('./welcome');
const pkg = require('./../package.json');
const handleError = require('./err');

module.exports = ({ clear = true }) => {
	process.on('unhandledRejection', err => {
		handleError(`UNHANDLED ERROR`, err);
	});
	welcome({
		title: `sql-archive`,
		tagLine: `by Adeniyi Aderounmu(teebarg01@gmail.com)`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true,
		clear
	});
};
