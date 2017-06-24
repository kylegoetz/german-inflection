const { PART } = require('../constants');

const words = ['klein', 'groß'];
const rv = {};
words.forEach(word => rv[word] = ({
	word,
	part: PART.ADJECTIVE
}));

module.exports = rv;
