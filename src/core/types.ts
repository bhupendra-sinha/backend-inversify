const CORE_TYPES = {
	CONFIG: Symbol.for('CONFIG'),
	DB: Symbol.for('DB'),
	LOGGER: Symbol.for('LOGGER'),
	ERROR_HANDLER: Symbol.for('ERROR_HANDLER')
};

const USER_TYPES = {
	USER_SERVICE: Symbol.for('USER_SERVICE'),
	USER_CONTROLLER: Symbol.for('USER_CONTROLLER')
};

const TYPES = {
	...CORE_TYPES,
	...USER_TYPES
};

export default TYPES;
