export const durationLimit = 500;

export const properties = [    
    "name",
    "ticker",
    "decimals",
    "logo",
    "description"
];

export const malformedProperties = {
	"subjects": [
		"2048c7e09308f9138cef8f1a81733b72e601d016eea5eef759ff2933416d617a696e67436f696e"
	],
	"properties": [
		"💣"
	]
};

export const nonExistantSubject = {
	"subjects": [
		"ABCD"
	],
	"properties": [
		"name"
	]
};

export const malformedUrl =
	"2048c7e09308f9138cef8f1a81733b72e601d016eea5eef759ff2933416d617a696e67436f696e/properties/💣";