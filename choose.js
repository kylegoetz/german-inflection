const arrayChoose = (items) => items[Math.floor(Math.random()*items.length)];
const objectChoose = (object) => object[arrayChoose(Object.keys(object))];

module.exports = {
	array: arrayChoose,
	object: objectChoose
};
