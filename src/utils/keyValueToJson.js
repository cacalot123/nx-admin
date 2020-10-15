export const keyValueToJson = function(keyValue) {
  const option = [];
  for (const [key, value] of Object.entries(keyValue)) {
    console.log(`${key}: ${value}`);
    option.push({value: key, label: value})
  }
  return option;
}
