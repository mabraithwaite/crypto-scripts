async function LP_STAKING(address, parameters = []) {
  console.log('address:', address);
  console.log('parameters:', parameters);
  if (!Array.isArray(parameters)) {
    parameters = [[parameters]];
  }

  const hashValue = getStringHash_(JSON.stringify(parameters) + '_' + address);
  const cachedValue = cacheGet_(hashValue);
  if (cachedValue) {
    console.log('using cached data....');
    return JSON.parse(cachedValue);
  }

  if (parameters.length === 0) {
    return [];
  }
  if (!Array.isArray(parameters[0])) {
    throw "Expected 2D array of key paths. Ex: [['key1','key2'],['key3','key4']]";
  }
  console.log('fetching data....');

  commonSleep_();
  const data = await fetchData_({
    url: `https://www.yieldwatch.net/api/all/${address}`,
    params: { platforms: 'pancake' }
  });
  const result = parameters.map((keys) =>
    keys.map(mapParmKeyToParamPath_).map((keyPath) => getDataPathItem_(data, keyPath))
  );
  cachePut_(hashValue, JSON.stringify(result));
  return result;
}
