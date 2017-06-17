wordStems = ['klein'];

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

const PREPOSITIONS = {
	mit: DATIVE_CASE,
	durch: ACCUSATIVE_CASE
};

inflections = {
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

words = [
	{
		word: 'Sache',
		gender: FEMININE
	},
	{
		word: 'Hersteller',
		gender: MASCULINE
	}
]

const strongInflection = (adj, gcase, gender)  => `${adj}${inflections[gcase][gender]}`;
const weakInflection = (adj, gcase, gender) => (gender === 'pl' || ~[DATIVE_CASE, GENITIVE_CASE].indexOf(gcase) || (gcase === ACCUSATIVE_CASE && gender === 'm')) ? `${adj}en` : `${adj}e`;
const mixedInflection = (adj, gcase, gender) => (gender === 'pl' || ~[DATIVE_CASE, GENITIVE_CASE].indexOf(gcase)) ? weakInflection(adj, gcase, gender) : strongInflection(adj, gcase, gender);

const pickCase = () => [NOMINATIVE_CASE, ACCUSATIVE_CASE, DATIVE_CASE, GENITIVE_CASE][parseInt(Math.random()*4)];
const pickGender = (word) => word.gender;
const pickWord = () => words[1];

const determineInflectionType = precedingWord => {
	if(  ~[null, '', undefined].indexOf(precedingWord)  ) {
		return STRONG_INFLECTION;
	}
	if(  ~ARTICLE_LIST.indexOf(precedingWord)  ) {
		return WEAK_INFLECTION;
	}
	return MIXED_INFLECTION;
}

const inflectArticle = (article, gcase) => {
	const gender = article === 'der' ? MASCULINE : article === 'die' ? FEMININE : article === 'das' ? NEUTER : PLURAL;
	return articles[gcase][gender];
}

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
	//`${word}${inflections[gCase][gender]}`;
}

const inflectPhrase = phrase => {
	console.log(PREPOSITIONS);
	const hasPreposition = Object.keys(PREPOSITIONS).find(phrase[0]) !== undefined;
	const toInflect = [...phrase];
	var idx = 0;
	var gcase = NOMINATIVE_CASE;
	if(  hasPreposition  ) {
		gcase = PREPOSITIONS[phrase[0]];
		++idx;
	}
	return [phrase[0], ...inflectNP(phrase.slice(idx), gcase)];
}

const inflectNP = (np, gcase) => {
	const tokens = np.split(' ');
	const initialToken = tokens[0];
	const noun = tokens[tokens.length-1];
	const gender = words.find(word=>word.word===noun).gender;
	var inflectionType = STRONG_INFLECTION;
	return tokens.map((word, i, wordList) => {
		if(  i === wordList.length-1  ) {
			return word;
		}
		if(  ~ARTICLE_LIST.indexOf(word)  ) {
			inflectionType = WEAK_INFLECTION;
			return inflectArticle(word, gcase);
		}
		return inflectAdjective(word, gcase, gender, inflectionType);
	});
}

const displayQuestion = (nounPhrase, gcase) => {
	console.log(`Inflect ${nounPhrase} into the [[${gcase}]]`);
}

const displayAnswer = (phrase, gcase) => {
	//console.log(`${inflectNP(nounPhrase.join(' '), gcase)}`);
	return inflectPhrase(phrase);
}

//const word = pickWord();
//const gCase = pickCase();

//console.log(inflectAdjective(wordStems[0], pickCase(), pickGender(word)));

//wordPair = ['eine', 'klein'];
//const inflectionType = determineInflectionType(wordPair[0]);

//console.log(`${wordPair[0]} ${inflectAdjective(wordStems[0], gCase, pickGender(word), inflectionType)} ${word.word}`);
//console.log(inflectNP('der klein Hersteller', GENITIVE_CASE));

const word = words[parseInt(Math.random()*2)];
const useArticle = Math.random()*2 < 1;

const NP = [];
if(  useArticle  ) {
	NP.push(articles[NOMINATIVE_CASE][word.gender]);
}
NP.push(wordStems[parseInt(Math.random()*wordStems.length)]);
NP.push(word.word);
const grammaticalCase = Object.keys(articles)[parseInt(Math.random()*4)];

displayQuestion(NP, grammaticalCase);
displayAnswer(NP, grammaticalCase);
//console.log(`::${grammaticalCase.toUpperCase()}, ${word.word}:: ${inflectNP(NP.join(' '), grammaticalCase)}`);
