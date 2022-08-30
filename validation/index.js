module.exports = function validateJoi(schema, data) {
  const { error } = schema.validate(data);
  return error ? error.details[0].message : error;
};
