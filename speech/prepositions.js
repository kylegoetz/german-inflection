const { DATIVE_CASE, ACCUSATIVE_CASE, GENITIVE_CASE, PART } = require('../constants');

const dat = ['aus', 'bei', 'nach', 'mit', 'seit', 'von', 'außer', 'gegenüber', 'zu'];
const akk = ['durch', 'für', 'gegen', 'ohne', 'um'];

const prepositions = {};
dat.forEach(word => prepositions[word] = ({ word, case: DATIVE_CASE, part: PART.PREPOSITION }));
akk.forEach(word => prepositions[word] = ({ word, case: ACCUSATIVE_CASE, part: PART.PREPOSITION}));

module.exports = prepositions;
