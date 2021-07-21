async function GECKO_ALL_DATA(ticker, parameters, byTicker = true) {
  Logger.log('ticker: ' + ticker);
  Logger.log('parameters: ' + parameters);
  Logger.log('byTicker: ' + byTicker);
  if (!Array.isArray(parameters)) {
    parameters = [[parameters]];
  }

  const hashValue = getStringHash_(JSON.stringify(parameters) + '_' + ticker);
  const cachedValue = cacheGet_(hashValue);
  if (cachedValue) {
    Logger.log('using cached value');
    return JSON.parse(cachedValue);
  }
  Logger.log('not using cached value');

  commonSleep_();
  const coinId = byTicker ? await fetchCoinId_(ticker) : ticker.toLowerCase().trim();

  const geckoData = await fetchCoinGeckoData_({
    url: `https://api.coingecko.com/api/v3/coins/${coinId}`
  });
  const result = parameters.map((parameterList) =>
    parameterList
      .map(mapParmKeyToParamPath_)
      .map((paramPath) => getDataPathItem_(geckoData, paramPath))
  );
  cachePut_(hashValue, JSON.stringify(result));
  return result;
}

const fetchCoinGeckoData_ = async (fetchOptions) => {
  return await fetchData_({ retryStrategy: retryOnStatusCodes_(423, 429), ...fetchOptions });
};

const fetchCoinId_ = async (symbol) => {
  symbol = symbol.toLowerCase();
  if (CoinTickerToCoinIdCache[symbol]) {
    return CoinTickerToCoinIdCache[symbol];
  }
  symbol = symbol.toUpperCase();
  const res = await fetchCoinGeckoData_({
    url: 'https://api.coingecko.com/api/v3/search',
    params: { locale: 'fr', img_path_only: '1' }
  });
  const coin = res.coins.find((coin) => coin.symbol === symbol);
  return coin?.id?.toString();
};
