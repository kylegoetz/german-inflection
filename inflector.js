//import * from './constants';
const {
	STRONG_INFLECTION, WEAK_INFLECTION, MIXED_INFLECTION,
	inflections, NOMINATIVE_CASE, ACCUSATIVE_CASE, DATIVE_CASE, GENITIVE_CASE,
	MASCULINE, FEMININE, NEUTER, PLURAL,
	articles, ARTICLE_LIST, PART
} = require('./constants');

const PREPOSITIONS = require('./speech/prepositions');

const strongInflection = (adj, gcase, gender)  => `${adj.word}${inflections[gcase][gender]}`;
const weakInflection = (adj, gcase, gender) => (gender === 'pl' || ~[DATIVE_CASE, GENITIVE_CASE].indexOf(gcase) || (gcase === ACCUSATIVE_CASE && gender === 'm')) ? `${adj.word}en` : `${adj}e`;
const mixedInflection = (adj, gcase, gender) => (gender === 'pl' || ~[DATIVE_CASE, GENITIVE_CASE].indexOf(gcase)) ? weakInflection(adj, gcase, gender) : strongInflection(adj, gcase, gender);


const inflectAdjective = (word, gCase, gender, inflectionType) => {
	switch(inflectionType) {
		case STRONG_INFLECTION:
			return strongInflection(word, gCase, gender);
		case WEAK_INFLECTION:
			return weakInflection(word, gCase, gender);
		case MIXED_INFLECTION:
			return mixedInflection(word, gCase, gender);
		default:
			throw new Error('Not a valid inflection type');
	}
};

const inflectArticle = (article, gcase) => {
	const gender = article === 'der' ? MASCULINE : article === 'die' ? FEMININE : article === 'das' ? NEUTER : PLURAL;
	return articles[gcase][gender];
};

const inflectPhrase = phrase => {
	const hasPreposition = phrase[0].part === PART.PREPOSITION;
	const toInflect = [...phrase];
	const gcase = phrase[0].case || NOMINATIVE_CASE;
	const idx = phrase[0].part === PART.PREPOSITION ? 1 : 0;
	if(  phrase[0].part === PART.PREPOSITION  ) {
		return [phrase[0].word, ...inflectNP(phrase.slice(1), gcase)];
	}
	return inflectNP(phrase, gcase);
}

const inflect = {
	[PART.PREPOSITION]: (word) => word.word,
	[PART.ADJECTIVE]: inflectAdjective,
	[PART.NOUN]: (word, gcase) => {
		switch(gcase) {
			case DATIVE_CASE: return word.word+'n';
			case GENITIVE_CASE: return word.genitive;
			default: return word.word;
		}
	}
};

const inflectNP = (np, gcase) => {
	const tokens = np;
	const noun = tokens.find(word => word.part === PART.NOUN);
	const gender = noun.gender;
	var inflectionType = STRONG_INFLECTION;
	return tokens.map((word, i, wordList) => {
		if(  word.part === PART.NOUN  ) {
			if(  gcase === DATIVE_CASE  ) {
				return word.word + 'n';
			}
			if(  gcase === GENITIVE_CASE  ) {
				return word.genitive;
			}
			return word.word;
		}
		if(  ~ARTICLE_LIST.indexOf(word)  ) {
			inflectionType = WEAK_INFLECTION;
			return inflectArticle(word, gcase);
		}
		return inflectAdjective(word, gcase, gender, inflectionType);
	});
}

module.exports = { inflectPhrase, inflectNP };
