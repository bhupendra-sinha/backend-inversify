const CORE_TYPES = {
  CONFIG: Symbol.for("CONFIG"),
  DB: Symbol.for("DB"),
  LOGGER: Symbol.for("LOGGER"),
};

const TYPES = {
  ...CORE_TYPES,
};

export default TYPES;
