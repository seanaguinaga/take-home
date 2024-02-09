export function queryStringToObject(queryString = "", options = {}) {
  let queryObject = {};
  queryString &&
    decodeURIComponent(queryString.replace("?", ""))
      .split("&")
      .forEach((itemString) => {
        let [itemKey, itemValue] = itemString.split("=");
        // Initialize the key in the object if not already present
        if (!queryObject[itemKey]) {
          queryObject[itemKey] = Array.isArray(options[itemKey])
            ? []
            : undefined;
        }
        let value = itemValue;
        // Attempt to convert to number if specified in options
        if (options[itemKey] === "number") {
          value = parseInt(itemValue, 10);
        } else if (options[itemKey] === "date") {
          // Convert to date if specified in options
          value = new Date(itemValue);
        }
        // Handle arrays and non-array values separately
        Array.isArray(queryObject[itemKey])
          ? queryObject[itemKey].push(value)
          : (queryObject[itemKey] = value);
      });
  return queryObject;
}

export function createQueryString(queryObject = {}) {
  let queryString = Object.keys(queryObject)
    .filter(
      (key) =>
        queryObject[key] !== null &&
        queryObject[key] !== undefined &&
        !(Array.isArray(queryObject[key]) && !queryObject[key].length)
    )
    .map((key) => {
      const value = queryObject[key];
      return Array.isArray(value)
        ? value
            .map(
              (item) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                  item instanceof Date ? item.toISOString() : item
                )}`
            )
            .join("&")
        : `${encodeURIComponent(key)}=${encodeURIComponent(
            value instanceof Date ? value.toISOString() : value
          )}`;
    })
    .join("&");
  return queryString ? `?${queryString}` : "";
}
