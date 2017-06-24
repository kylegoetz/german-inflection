const { MASCULINE, FEMININE, NEUTER, PART } = require('../constants');

const nounList = {
	Hersteller: {
		word: 'Hersteller',
		plural: 'Hersteller',
		genitive: 'Herstellers',
		gender: MASCULINE,
		part: PART.NOUN
	},
	Sache: {
		word: 'Sache',
		plural: 'Sachen',
		genitive: 'Sache',
		gender: FEMININE
	}
};

Object.keys(nounList).forEach(key => nounList[key].part = PART.NOUN);

module.exports = nounList;
