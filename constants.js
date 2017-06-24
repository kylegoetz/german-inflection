const STRONG_INFLECTION = 'STRONG',
	WEAK_INFLECTION = 'WEAK',
	MIXED_INFLECTION = 'MIXED';

const NOMINATIVE_CASE = 'Nom.',
	ACCUSATIVE_CASE = 'Akk.',
	DATIVE_CASE = 'Dat.',
	GENITIVE_CASE = 'Gen.';

const MASCULINE = 'm',
	FEMININE = 'f',
	NEUTER = 'n',
	PLURAL = 'p';

const PART = {
	NOUN: 'noun',
	ADJECTIVE: 'adjective',
	PREPOSITION: 'preposition'
};

const articles = {
	[NOMINATIVE_CASE]: {
		[MASCULINE]: 'der',
		[FEMININE]: 'die',
		[NEUTER]: 'das',
		[PLURAL]: 'die'
	},
	[ACCUSATIVE_CASE]: {
		[MASCULINE]: 'den',
		[FEMININE]: 'die',
		[NEUTER]: 'das',
		[PLURAL]: 'die'
	},
	[DATIVE_CASE]: {
		[MASCULINE]: 'dem',
		[FEMININE]: 'der',
		[NEUTER]: 'dem',
		[PLURAL]: 'den'
	},
	[GENITIVE_CASE]: {
		[MASCULINE]: 'des',
		[FEMININE]: 'der',
		[NEUTER]: 'des',
		[PLURAL]: 'der'
	}
};

const ARTICLE_LIST = ['der', 'die', 'das', 'den', 'dem', 'des'];

const inflections = {
	[NOMINATIVE_CASE]: {
		[MASCULINE]: 'er',
		[FEMININE]: 'e',
		[NEUTER]: 'es',
		[PLURAL]: 'e'
	},
	[ACCUSATIVE_CASE]: {
		[MASCULINE]: 'en',
		[FEMININE]: 'e',
		[NEUTER]: 'es',
		[PLURAL]: 'e'
	},
	[DATIVE_CASE]: {
		[MASCULINE]: 'em',
		[FEMININE]: 'er',
		[NEUTER]: 'em',
		[PLURAL]: 'en'
	},
	[GENITIVE_CASE]: {
		[MASCULINE]: 'en',
		[FEMININE]: 'er',
		[NEUTER]: 'en',
		[PLURAL]: 'er'
	}
};

module.exports = {
	STRONG_INFLECTION, WEAK_INFLECTION, MIXED_INFLECTION,
	inflections, NOMINATIVE_CASE, ACCUSATIVE_CASE, DATIVE_CASE, GENITIVE_CASE,
	MASCULINE, FEMININE, NEUTER, PLURAL,
	articles, ARTICLE_LIST, PART
};
