const SEARCH_TYPES_ = {
  ID: 'id',
  SYMBOL: 'symbol',
  SLUG: 'slug'
};

/**
 * Gets the current price of the passed symbol/id/slug in the currency type passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get price(s) for.
 * @param {"USD"} currency Denomination of the price. Default: 'usd'.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Current price.
 */
async function CMC_PRICE(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'price', searchType);
}

/**
 * Gets the current volume of the passed symbol/id/slug in the currency type passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get volume(s) for.
 * @param {"USD"} currency Denomination of the volume. Default: 'usd'.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Current volume.
 */
async function CMC_VOLUME(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'volume_24h', searchType);
}

/**
 * Gets the current market cap of the passed symbol/id/slug in the currency type passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get market cap(s) for.
 * @param {"USD"} currency Denomination of the market cap. Default: 'usd'.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Current market cap.
 */
async function CMC_MARKET_CAP(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'market_cap', searchType);
}

/**
 * Gets the current fully dilluted market cap of the passed symbol/id/slug in the currency type passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get fully dilluted market cap(s) for.
 * @param {"USD"} currency Denomination of the fully dilluted market cap. Default: 'usd'.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Current fully dilluted market cap.
 */
async function CMC_DIL_MARKET_CAP(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'fully_diluted_market_cap', searchType);
}

/**
 * Gets the current market cap dominance of the passed symbol/id/slug in the currency type passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get market cap dominance(s) for.
 * @param {"USD"} currency Denomination of the market cap dominance. Default: 'usd'.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Current market cap dominance.
 */
async function CMC_MARKET_CAP_DOM(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'market_cap_dominance', searchType);
}

/**
 * Gets the current 1hr percent change of the passed symbol/id/slug in the currency type passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get 1hr percent change(s) for.
 * @param {"USD"} currency Denomination of the 1hr percent change. Default: 'usd'.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Current 1hr percent change.
 */
async function CMC_1HR_PERCENT_CHANGE(
  tickers,
  currency = 'usd',
  searchType = SEARCH_TYPES_.SYMBOL
) {
  return await cmcSingleCurrencyData_(tickers, currency, 'percent_change_1h', searchType);
}

/**
 * Gets the current 24hr percent change of the passed symbol/id/slug in the currency type passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get 24hr percent change(s) for.
 * @param {"USD"} currency Denomination of the 24hr percent change. Default: 'usd'.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Current 24hr percent change.
 */
async function CMC_24HR_PERCENT_CHANGE(
  tickers,
  currency = 'usd',
  searchType = SEARCH_TYPES_.SYMBOL
) {
  return await cmcSingleCurrencyData_(tickers, currency, 'percent_change_24h', searchType);
}

/**
 * Gets the current 7 day percent change of the passed symbol/id/slug in the currency type passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get 7 day percent change(s) for.
 * @param {"USD"} currency Denomination of the 7 day percent change. Default: 'usd'.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Current 7 day percent change.
 */
async function CMC_7D_PERCENT_CHANGE(tickers, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyData_(tickers, currency, 'percent_change_7d', searchType);
}

/**
 * Gets the current 30 day percent change of the passed symbol/id/slug in the currency type passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get 30 day percent change(s) for.
 * @param {"USD"} currency Denomination of the 30 day percent change. Default: 'usd'.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Current 30 day percent change.
 */
async function CMC_30D_PERCENT_CHANGE(
  tickers,
  currency = 'usd',
  searchType = SEARCH_TYPES_.SYMBOL
) {
  return await cmcSingleCurrencyData_(tickers, currency, 'percent_change_30d', searchType);
}

/**
 * Gets the current rank of the passed symbol/id/slug.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get rank(s) for.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Current rank.
 */
async function CMC_RANK(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'cmc_rank', searchType);
}

/**
 * Gets the ID of the passed symbol/id/slug.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get ID(s) for.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns ID of the crypto.
 */
async function CMC_ID(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'id', searchType);
}

/**
 * Gets the name of the passed symbol/id/slug.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get name(s) for.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Name of the crypto.
 */
async function CMC_NAME(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'name', searchType);
}

/**
 * Gets the symbol of the passed symbol/id/slug.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get symbol(s) for.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Symbol of the crypto.
 */
async function CMC_SYMBOL(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'symbol', searchType);
}

/**
 * Gets the slug of the passed symbol/id/slug.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get slug(s) for.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Slug of the crypto.
 */
async function CMC_SLUG(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'slug', searchType);
}

/**
 * Gets the circulating supply of the passed symbol/id/slug.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get circulating supply(s) for.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Circulating supply of the crypto.
 */
async function CMC_CIRCULATING_SUPPLY(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'circulating_supply', searchType);
}

/**
 * Gets the total supply of the passed symbol/id/slug.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get total supply(s) for.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Total supply of the crypto.
 */
async function CMC_TOTAL_SUPPLY(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'total_supply', searchType);
}

/**
 * Gets the max supply of the passed symbol/id/slug.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get max supply(s) for.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Max supply of the crypto.
 */
async function CMC_MAX_SUPPLY(tickers, searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleData_(tickers, 'max_supply', searchType);
}

/**
 * Helper function to get the currency path item from the data returned from url.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get data for.
 * @param {"USD"} currency Denomination of the data.
 * @param {"price"} path Path to the item in the returned data.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug.
 * @returns Crypto data in the currency passed.
 */
const cmcSingleCurrencyData_ = async (tickers, currency, path, searchType) => {
  console.log('tickers:', tickers);
  console.log('currency:', currency);
  console.log('path:', path);
  console.log('searchType:', searchType);

  checkInput_(isCell_(currency), 'Currency should be one string');

  return await CMC_DATA(tickers, `quote/${currency.toUpperCase()}/${path}`, searchType);
};

/**
 * Helper function to get the path item from the data returned from url.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get data for.
 * @param {"price"} path Path to the item in the returned data.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug.
 * @returns Crypto data.
 */
const cmcSingleData_ = async (tickers, path, searchType) => {
  console.log('tickers:', tickers);
  console.log('path:', path);
  console.log('searchType:', searchType);

  return await CMC_DATA(tickers, path, searchType);
};

/**
 * Gets the price of the passed symbol/id/slug in the currency type passed at the date/time passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get data.
 * @param {"yyyy-mm-dd"|"yyyy-mm-ddThh:mm:ssZ"} date Date that you'd like to retrieve the data. Date in ISO format.
 * @param {"USD"} currency Denomination of the data. Default: 'usd'
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug.
 * @returns Crypto price in the currency passed at the date/time passed.
 */
async function CMC_HIST_PRICE(tickers, date, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyHistData_(tickers, currency, 'price', date, searchType);
}

/**
 * Gets the volume of the passed symbol/id/slug in the currency type passed at the date/time passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get data.
 * @param {"yyyy-mm-dd"|"yyyy-mm-ddThh:mm:ssZ"} date Date that you'd like to retrieve the data. Date in ISO format.
 * @param {"USD"} currency Denomination of the data. Default: 'usd'
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug.
 * @returns Crypto volume in the currency passed at the date/time passed.
 */
async function CMC_HIST_VOLUME(tickers, date, currency = 'usd', searchType = SEARCH_TYPES_.SYMBOL) {
  return await cmcSingleCurrencyHistData_(tickers, currency, 'volume_24h', date, searchType);
}

/**
 * Gets the market cap of the passed symbol/id/slug in the currency type passed at the date/time passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get data.
 * @param {"yyyy-mm-dd"|"yyyy-mm-ddThh:mm:ssZ"} date Date that you'd like to retrieve the data. Date in ISO format.
 * @param {"USD"} currency Denomination of the data. Default: 'usd'
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug.
 * @returns Crypto market cap in the currency passed at the date/time passed.
 */
async function CMC_HIST_MARKET_CAP(
  tickers,
  date,
  currency = 'usd',
  searchType = SEARCH_TYPES_.SYMBOL
) {
  return await cmcSingleCurrencyHistData_(tickers, currency, 'market_cap', date, searchType);
}

/**
 * Helper function to get the currency path item from the data returned from url at the date/time passed.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get data for.
 * @param {"USD"} currency Denomination of the data.
 * @param {"price"} path Path to the item in the returned data.
 * @param {"yyyy-mm-dd"|"yyyy-mm-ddThh:mm:ssZ"} date Date that you'd like to retrieve the data. Date in ISO format.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug.
 * @returns Crypto data in the currency passed.
 */
const cmcSingleCurrencyHistData_ = async (tickers, currency, path, date, searchType) => {
  console.log('tickers:', tickers);
  console.log('currency:', currency);
  console.log('path:', path);
  console.log('searchType:', searchType);

  checkInput_(isCell_(currency), 'Currency should be one string');

  return await CMC_HIST_DATA(
    tickers,
    `quotes/0/quote/${currency.toUpperCase()}/${path}`,
    date,
    searchType
  );
};

/**
 * Gets crypto data of the passed symbol/id/slug. Data is extracted based on the data paths passed.
 * This requires some knowledge of the JSON returned from the API.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get price(s) for.
 * @param {"quote/USD/price"|B1:D1|B1:B4} parameters Paths of the data to extract from the JSON returned from the api.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Data extracted from JSON returned.
 */
async function CMC_DATA(tickers, parameters, searchType = SEARCH_TYPES_.SYMBOL) {
  console.log('tickers:', tickers);
  console.log('parameters:', parameters);
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

  const uniqueSearch = getSortedUniqueList_(tickerList);
  const uniqueParams = getSortedUniqueList_(paramList);
  const convert = extractCurrenciesFromParameters_(paramList);

  const cacheId = getStringHash_(JSON.stringify(uniqueSearch) + '_' + JSON.stringify(uniqueParams));
  const cachedValue = cacheGet_(cacheId);

  let result;
  if (cachedValue) {
    console.log('using cached data....');
    result = JSON.parse(cachedValue);
  } else {
    console.log('fetching data....');
    let data;
    try {
      data = (
        await fetchCMCData_(`cryptocurrency/quotes/latest`, {
          [searchType]: uniqueSearch.join(),
          ...(convert.length ? { convert } : {})
        })
      ).data;
    } catch (e) {
      throwStatusMessageOrError_(e);
    }
    result = {};
    for (const ticker of uniqueSearch) {
      result[ticker] = paramList
        .map(mapParmKeyToParamPath_)
        .map((paramPath) => getDataPathItem_(data[ticker], paramPath));
    }
    cachePut_(cacheId, JSON.stringify(result));
  }
  const mapped = tickerList.map((ticker) => (!ticker ? [] : result[ticker]));
  return isTickerACol ? mapped : rotateGrid_(mapped);
}

/**
 * Gets crypto data of the passed symbol/id/slug. Data is extracted based on the data paths passed.
 * This requires some knowledge of the JSON returned from the API.
 *
 * @param {"BTC"|B1:D1|B1:B4} tickers Symbol/id/slug to get price(s) for.
 * @param {"quote/USD/price"|B1:D1|B1:B4} parameters Paths of the data to extract from the JSON returned from the api.
 * @param {"yyyy-mm-dd"|"yyyy-mm-ddThh:mm:ssZ"} date Date that you'd like to retrieve the data. Date in ISO format.
 * @param {"id"|"symbol"|"slug"} searchType Type that the ticker is in. Options: id/symbol/slug. Default: 'symbol'.
 * @returns Data extracted from JSON returned.
 */
async function CMC_HIST_DATA(tickers, parameters, date, searchType = SEARCH_TYPES_.SYMBOL) {
  console.log('tickers:', tickers);
  console.log('parameters:', parameters);
  console.log('date:', date);
  console.log('searchType:', searchType);

  searchType = searchType.toLowerCase();
  checkInput_(
    Object.values(SEARCH_TYPES_).includes(searchType),
    `Search type needs to be one of the following: ${Object.values(SEARCH_TYPES_).join('/')}`
  );
  checkInput_(isCellOrRowOrCol_(tickers), 'Ticker(s) need to be a single cell/row/col');
  checkInput_(isCellOrRowOrCol_(parameters), 'Param(s) need to be a single cell/row/col');
  checkInput_(!isNaN(new Date(date).getTime()), 'Invalid date/time');
  checkInput_(new Date(date) < new Date(), 'Date needs to be in the past');

  const isTickerACol = isCell_(tickers) ? true : tickers.length > tickers[0].length;

  const tickerList = flattenGridOrCell_(tickers);
  const paramList = flattenGridOrCell_(parameters);

  const uniqueSearch = getSortedUniqueList_(tickerList);
  const uniqueParams = getSortedUniqueList_(paramList);
  const convert = extractCurrenciesFromParameters_(paramList);

  const cacheId = getStringHash_(
    JSON.stringify(uniqueSearch) + '_' + JSON.stringify(uniqueParams) + '_' + date
  );
  const cachedValue = cacheGet_(cacheId);

  let result;
  if (cachedValue) {
    console.log('using cached data....');
    result = JSON.parse(cachedValue);
  } else {
    console.log('fetching data....');
    let data;
    try {
      data = (
        await fetchCMCData_('cryptocurrency/quotes/historical', {
          [searchType]: uniqueSearch.join(),
          time_start: date,
          ...(convert.length ? { convert } : {})
        })
      ).data;
    } catch (e) {
      throwStatusMessageOrError_(e);
    }
    result = {};
    for (const ticker of uniqueSearch) {
      result[ticker] = paramList
        .map(mapParmKeyToParamPath_)
        .map((paramPath) => getDataPathItem_(data[ticker], paramPath));
    }
    cachePut_(cacheId, JSON.stringify(result));
  }
  const mapped = tickerList.map((ticker) => (!ticker ? [] : result[ticker]));
  return isTickerACol ? mapped : rotateGrid_(mapped);
}

/**
 * Calls coin market cap api with passed url params and options. Handles retrying on certain status codes.
 *
 * @param {"cryptocurrency/latest"} path URL path to take from the api
 * @param {{ symbol: 'BTC' }} params URL options to add for the api
 * @param {{ headers: { api_key: 'api_key' } }} options Additional options when fetching api data (e.g. headers)
 * @returns JSON data from the api.
 */
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

/**
 * Extracts different currency types from the passed parameters.
 *
 * @param {['quote/USD/price', 'quote/BTC/price']} paramList List of parameters to extract currency from.
 * @returns List of unique currencies extracted from parameters.
 */
const extractCurrenciesFromParameters_ = (paramList) => {
  return getSortedUniqueList_(
    paramList
      .map((v) => {
        const s = v.split('/');
        return s[0] === 'quote' && s.length > 1 ? s[1] : '';
      })
      .filter((v) => v)
      .filter((v) => v !== 'USD' && v !== 'usd')
  );
};

/**
 * Returns a copy of the list with duplicates removed and sorted. Also removes falsy values.
 *
 * @param list Gets a unique list of items sorted.
 * @returns Unique list of items also sorted.
 */
const getSortedUniqueList_ = (list) => {
  return [...new Set(list)].filter((v) => v).sort();
};

/**
 * Tries to extract and throw api error message for better readability.
 *
 * @param e Error to extract message from.
 */
const throwStatusMessageOrError_ = (e) => {
  try {
    e = JSON.parse(e.message);
  } catch (e2) {
    console.error('Failed to parse error message');
    throw e;
  }
  if (e && e.status && e.status.error_message) {
    throw new Error(e.status.error_message);
  }
  throw e;
};
