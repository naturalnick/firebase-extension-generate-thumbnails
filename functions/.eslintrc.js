module.exports = {
	root: true,
	env: {
		es8: true,
		node: true,
	},
	extends: ["eslint:recommended", "google"],
	rules: {
		quotes: ["error", "double"],
	},
};
