
module.exports = function (searchCatalog, reqQuery) {
  let allowFields = new Set(Object.keys(searchCatalog));
  let queryFields = new Set(Object.keys(reqQuery));

  const intersection = new Set([...allowFields].filter(x => queryFields.has(x)))

  let whereObj = {}
  for (const targetFields of intersection) {
    whereObj[targetFields] = t = {};
    t[searchCatalog[targetFields]] = reqQuery[targetFields];
  }

  return whereObj;
};