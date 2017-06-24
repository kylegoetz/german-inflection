const { inflectPhrase, inflectNP } = require('./inflector');
const { FEMININE, MASCULINE, articles, NOMINATIVE_CASE } = require('./constants');
const prepositions = require('./speech/prepositions');
const choose = require('./choose');

const speech = require('./speech');
const adjectives = speech.adjectives;
const nouns = speech.nouns;

const displayQuestion = (nounPhrase) => {
	console.log(`Inflect ${nounPhrase.map(word => typeof word === 'object' ? word.word : word)}`);
}

const displayAnswer = (phrase, gcase) => {
	return inflectPhrase(phrase);
}

const word = choose.object(nouns);
const useArticle = choose.array([true, false]);
const usePreposition = choose.array([true, false]);
const preposition = usePreposition ? choose.object(prepositions) : null;

const NP = [];
if(  preposition  ) {
	NP.push(preposition);
}
if(  useArticle  ) {
	NP.push(articles[NOMINATIVE_CASE][word.gender]);
}
NP.push(choose.object(adjectives));
NP.push(word);

displayQuestion(NP);
console.log(inflectPhrase(NP));
