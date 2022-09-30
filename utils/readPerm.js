const fs = require('fs');
const readline = require('readline');
const events = require('events');

module.exports = async function readPermission(pem) {
	const fileStream = fs.createReadStream(`./${pem}`);

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const resultMap = [];
	rl.on('line', line => {
		const s = line.replace(/ /g, '').split(',');
		resultMap.push(s);
	});

	await events.once(rl, 'close');
	if (resultMap.length < 2) return {}
	const columns = resultMap[0];
	const rows = resultMap[1];
	const result = columns.reduce((target, current, index) => {
		return { ...target, [current]: rows[index] };
	}, {});
	return result;
};
