export function validateJoi(schema: any, data: any) {
  const { error } = schema.validate(data)
  return error ? error.details[0].message : error
}
