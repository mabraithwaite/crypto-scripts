async function GECKO_DATA(ticker, parameters, byTicker = true) {
  Logger.log('ticker: ' + ticker);
  Logger.log('parameters: ' + parameters);
  Logger.log('byTicker: ' + byTicker);
  if (!Array.isArray(parameters)) {
    parameters = [[parameters]];
  }

  const hashValue = getStringHash_(JSON.stringify(parameters) + '_' + ticker);
  const cachedValue = cacheGet_(hashValue);
  if (cachedValue) {
    Logger.log('Using cached value');
    return JSON.parse(cachedValue);
  }
  Logger.log('Not using cached value');

  commonSleep_();
  const coinId = byTicker ? await fetchCoinId_(ticker) : ticker.toLowerCase().trim();

  const geckoData = await fetchCoinGeckoData_(`coins/${coinId}`);
  const result = parameters.map((parameterList) =>
    parameterList
      .map(mapParmKeyToParamPath_)
      .map((paramPath) => getDataPathItem_(geckoData, paramPath))
  );
  cachePut_(hashValue, JSON.stringify(result));
  return result;
}

const fetchCoinGeckoData_ = async (path, params) => {
  const prefix = CG_PRO_API_KEY ? 'pro-api' : 'api';
  const additionalParams = CG_PRO_API_KEY ? { x_cg_pro_api_key: CG_PRO_API_KEY } : {};
  return await fetchData_({
    url: `https://${prefix}.coingecko.com/api/v3/${path}`,
    params: { ...params, ...additionalParams },
    retryStrategy: retryOnStatusCodes_(423, 429)
  });
};

const fetchCoinId_ = async (symbol) => {
  symbol = symbol.toLowerCase();
  if (CoinTickerToCoinIdCache[symbol]) {
    return CoinTickerToCoinIdCache[symbol];
  }
  const res = await fetchCoinGeckoData_('search', { locale: 'fr', img_path_only: '1' });
  symbol = symbol.toUpperCase();
  const coin = res.coins.find((coin) => coin.symbol === symbol);
  return coin?.id?.toString();
};
