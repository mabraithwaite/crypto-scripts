const SEARCH_TYPES_ = {
  ID: 'id',
  SYMBOL: 'symbol',
  SLUG: 'slug'
};

async function CMC_PRICE(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'price', searchType);
}

async function CMC_VOLUME(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'volume_24h', searchType);
}

async function CMC_MARKET_CAP(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'market_cap', searchType);
}

async function CMC_DIL_MARKET_CAP(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'fully_diluted_market_cap', searchType);
}

async function CMC_MARKET_CAP_DOM(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'market_cap_dominance', searchType);
}

async function CMC_1HR_PERCENT_CHANGE(
  tickers,
  currency = 'usd',
  searchType = SEARCH_TYPES_.SYMBOL
) {
  return await cmcSingleCurrencyData_(tickers, currency, 'percent_change_1h', searchType);
}

async function CMC_24HR_PERCENT_CHANGE(
  tickers,
  currency = 'usd',
  searchType = SEARCH_TYPES_.SYMBOL
) {
  return await cmcSingleCurrencyData_(tickers, currency, 'percent_change_24h', searchType);
}

async function CMC_7D_PERCENT_CHANGE(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'percent_change_7d', searchType);
}

async function CMC_30D_PERCENT_CHANGE(
  tickers,
  currency = 'usd',
  searchType = SEARCH_TYPES_.SYMBOL
) {
  return await cmcSingleCurrencyData_(tickers, currency, 'percent_change_30d', searchType);
}

async function CMC_RANK(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'cmc_rank', searchType);
}

async function CMC_ID(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'id', searchType);
}

async function CMC_NAME(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'name', searchType);
}

async function CMC_SYMBOL(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'symbol', searchType);
}

async function CMC_SLUG(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'slug', searchType);
}

async function CMC_CIRCULATING_SUPPLY(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'circulating_supply', searchType);
}

async function CMC_TOTAL_SUPPLY(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'total_supply', searchType);
}

async function CMC_MAX_SUPPLY(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'max_supply', searchType);
}

const cmcSingleCurrencyData_ = async (tickers, currency, path, searchType) => {
  console.log('tickers: ' + tickers);
  console.log('currency: ' + currency);
  console.log('path: ' + path);
  console.log('searchType:', searchType);

  checkInput_(isCell_(currency), 'Currency should be one string');

  return await CMC_DATA(tickers, `quote/${currency.toUpperCase()}/${path}`, searchType);
};

const cmcSingleData_ = async (tickers, path, searchType) => {
  console.log('tickers: ' + tickers);
  console.log('path: ' + path);
  console.log('searchType:', searchType);

  return await CMC_DATA(tickers, path, searchType);
};

async function CMC_DATA(tickers, parameters, searchType = SEARCH_TYPES_.SYMBOL) {
  console.log('tickers: ' + tickers);
  console.log('parameters: ' + parameters);
  console.log('searchType:', searchType);

  searchType = searchType.toLowerCase();
  checkInput_(
    Object.values(SEARCH_TYPES_).includes(searchType),
    `Search type needs to be one of the following: ${Object.values(SEARCH_TYPES_).join('/')}`
  );
  checkInput_(isCellOrRowOrCol_(tickers), 'Ticker(s) need to be a single cell/row/col');
  checkInput_(isCellOrRowOrCol_(parameters), 'Param(s) need to be a single cell/row/col');

  const isTickerACol = isCell_(tickers) ? true : tickers.length > tickers[0].length;

  const tickerList = flattenGridOrCell_(tickers);
  const paramList = flattenGridOrCell_(parameters);

  const uniqueSearch = [...new Set(tickerList)].filter((v) => v).sort();
  const uniqueParams = [...new Set(paramList)].filter((v) => v).sort();
  const convert = [
    ...new Set(
      paramList
        .map((v) => {
          const s = v.split('/');
          return s[0] === 'quote' && s.length > 1 ? s[1] : '';
        })
        .filter((v) => v)
        .filter((v) => v !== 'USD' && v !== 'usd')
    )
  ];

  const cacheId = getStringHash_(JSON.stringify(uniqueSearch) + '_' + JSON.stringify(uniqueParams));
  const cachedValue = cacheGet_(cacheId);

  let result;
  if (cachedValue) {
    console.log('using cached data....');
    result = JSON.parse(cachedValue);
  } else {
    console.log('fetching data....');
    const { data } = await fetchCMCData_(`cryptocurrency/quotes/latest`, {
      [searchType]: uniqueSearch.join(),
      ...(convert.length ? { convert } : {})
    });
    result = {};
    for (const ticker of uniqueSearch) {
      result[ticker] = paramList
        .map(mapParmKeyToParamPath_)
        .map((paramPath) => getDataPathItem_(data[ticker], paramPath));
    }
    cachePut_(cacheId, JSON.stringify(result));
  }
  console.log('result:', result);
  const mapped = tickerList.map((ticker) => (!ticker ? [] : result[ticker]));
  return isTickerACol ? mapped : rotateGrid_(mapped);
}

const fetchCMCData_ = async (path, params, options) => {
  return await fetchData_({
    url: `https://pro-api.coinmarketcap.com/v1/${path}`,
    params,
    options: {
      ...options,
      headers: {
        ...(options || {}).headers,
        'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY
      }
    },
    retryStrategy: retryOnStatusCodes_(429)
  });
};
