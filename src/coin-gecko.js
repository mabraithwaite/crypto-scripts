/** GECKOPRICE
 * Imports CoinGecko's cryptocurrency prices into Google spreadsheets. The price feed can be an array of tickers or a single ticker.
 * By default, data gets transformed into a array/number so it looks more like a normal price data import.
 * For example:
 *
 *   =GECKOPRICE("BTC")
 *   =GECKOPRICE("BTC-EUR")
 *   =GECKOPRICE(B16:B35,"CHF")
 *
 * @param {cryptocurrencies}               the cryptocurrency RANGE of tickers/id you want the prices from
 * @param {defaultVersusCoin}              by default prices are against "usd", only 1 input
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a dimensional array containing the prices
 **/
async function GECKOPRICE(tickerArray, currencyArray) {
  console.log('tickerArray:', tickerArray);
  console.log('currencyArray:', currencyArray);
  const { pairMatrix, coinIdSet, currencySet } = await getPairMatrixInfo_(
    tickerArray,
    currencyArray,
    true
  );

  const cacheId = getStringHash_(
    JSON.stringify(tickerArray || []) + JSON.stringify(currencyArray || []) + 'GECKOPRICE'
  );
  const cached = cacheGet_(cacheId);
  if (cached) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }

  console.log('fetching data....');
  commonSleep_();
  const geckoData = await fetchCoinGeckoData_('simple/price', {
    ids: [...coinIdSet].join(','),
    vs_currencies: [...currencySet].join(',')
  });
  const data = pairMatrix.map((pairs) =>
    pairs.map((pair) => (pair.id ? geckoData[pair.id][pair.currency] : ''))
  );
  cachePut_(cacheId, JSON.stringify(data));
  return data;
}

/** GECKOPRICEBYNAME
 * Imports CoinGecko's cryptocurrency prices into Google spreadsheets. The id_coin of cryptocurrency ticker is found in web address of Coingecko (https://www.coingecko.com/en/coins/bitcoin/usd).
 * For example:
 *
 *   =GECKOPRICEBYNAME("bitcoin", "USD",$A$1)
 *
 *
 * @param {id_coin}                 the id name of cryptocurrency ticker found in web address of Coingecko ex:https://www.coingecko.com/en/coins/bitcoin/usd, only 1 parameter
 * @param {against fiat currency}   the fiat currency ex: usd  or eur
 * @param {parseOptions}            an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a one-dimensional array containing the price
 **/
async function GECKOPRICEBYNAME(coinIdArray, currencyArray) {
  console.log('coinIdArray:', coinIdArray);
  console.log('currencyArray:', currencyArray);
  const { pairMatrix, coinIdSet, currencySet } = await getPairMatrixInfo_(
    coinIdArray,
    currencyArray,
    false
  );
  console.log('pairMatrix:', pairMatrix);
  console.log('coinIdSet:', coinIdSet);
  console.log('currencySet:', currencySet);

  const cacheId = getStringHash_(
    JSON.stringify(coinIdArray || []) + JSON.stringify(currencyArray || []) + 'GECKOPRICEBYNAME'
  );
  const cached = cacheGet_(cacheId);
  if (cached) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }

  console.log('fetching data....');
  commonSleep_();
  const geckoData = await fetchCoinGeckoData_('simple/price', {
    ids: [...coinIdSet].join(','),
    vs_currencies: [...currencySet].join(',')
  });
  const data = pairMatrix.map((pairs) =>
    pairs.map((pair) => (pair.id ? geckoData[pair.id][pair.currency] : ''))
  );
  cachePut_(cacheId, JSON.stringify(data));
  return data;
}

/** GECKOVOLUME
 * Imports CoinGecko's cryptocurrencies 24h volumes into Google spreadsheets. The feed can be an array of tickers or a single ticker.
 * By default, data gets transformed into an array/number so it looks more like a normal number data import.
 * For example:
 *
 *   =GECKOVOLUME("BTC","EUR")
 *   =GECKOVOLUME(B16:B35)
 *
 *
 * @param {cryptocurrencies}               the cryptocurrency RANGE tickers/id you want the prices from
 * @param {currency}                       by default "usd", only 1 parameter
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return an array containing the 24h volumes
 **/
async function GECKOVOLUME(tickerArray, currency) {
  return await getCoinsMarketsData_(
    tickerArray,
    currency,
    true,
    (marketData) => marketData.total_volume,
    'GECKOVOLUME'
  );
}

/** GECKOCAP
 * Imports cryptocurrencies total market cap into Google spreadsheets. The feed can be an array of tickers or a single ticker.
 * By default, data gets transformed into an array/number
 * For example:
 *
 *   =GECKOCAP("BTC","EUR")
 *   =GECKOCAP(B16:B35)
 *
 *
 * @param {cryptocurrencies}               the cryptocurrency RANGE of tickers/id you want the prices from
 * @param {currency}                       by default "usd", only 1 parameter
 * @param {parseOptions}            an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @returns an array of market caps
 **/
async function GECKOCAP(tickerArray, currency) {
  return await getCoinsMarketsData_(
    tickerArray,
    currency,
    true,
    (marketData) => marketData.market_cap,
    'GECKOCAP'
  );
}

/** GECKOCAPDILUTED
 * Imports cryptocurrencies total diluted market cap into Google spreadsheets. The feed is a dimensional array.
 * For example:
 *
 *   =GECKOCAPDILUTED("BTC","JPY")
 *   =GECKOCAPDILUTED(B16:B35)
 *
 * @param {cryptocurrencies}               the cryptocurrency RANGE of tickers/id you want the prices from
 * @param {currency}                       by default "usd", only 1 parameter
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @returns the fully diluted market caps
 **/
async function GECKOCAPDILUTED(tickerArray, currency) {
  return await getCoinsMarketsData_(
    tickerArray,
    currency,
    true,
    (marketData) => marketData.fully_diluted_valuation,
    'GECKOCAPDILUTED'
  );
}

/** GECKO24HPRICECHANGE
 * Imports cryptocurrencies 24H percent price change into Google spreadsheets. The feed is a dimensional array.
 * For example:
 *
 *   =GECKO24HPRICECHANGE("BTC","EUR")
 *   =GECKO24HPRICECHANGE(B16:B35)
 *
 * @param {cryptocurrencies}               the cryptocurrency RANGE of tickers/id you want the prices from
 * @param {currency}                       by default "usd", only 1 parameter
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @returns the cryptocurrencies 24H percent price change
 **/
async function GECKO24HPRICECHANGE(tickerArray, currency) {
  return await getCoinsMarketsData_(
    tickerArray,
    currency,
    true,
    (marketData) => parseFloat(marketData.price_change_percentage_24h) / 100,
    'GECKO24HPRICECHANGE'
  );
}

/** GECKORANK
 * Imports cryptocurrencies RANKING into Google spreadsheets. The feed is a dimensional array or single ticker/id.
 * For example:
 *
 *   =GECKORANK("BTC")
 *
 *
 * @param {cryptocurrencies}               the cryptocurrency RANGE of tickers/id you want the prices from
 * @param {currency}                       by default "usd", only 1 parameter
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @returns the Ranks of cryptocurrencies
 **/
async function GECKORANK(tickerArray, currency) {
  return await getCoinsMarketsData_(
    tickerArray,
    currency,
    true,
    (marketData) => marketData.market_cap_rank,
    'GECKORANK'
  );
}

/** GECKOATH
 * Imports CoinGecko's cryptocurrency All Time High Price into Google spreadsheets. The price feed is an array of tickers.
 * By default, data gets transformed into an array of numbers so it looks more like a normal price data import.
 * For example:
 *
 *   =GECKOATH("ethereum","EUR")
 *   =GECKOATH(a1:a10)
 *
 * @param {cryptocurrencies}               the cryptocurrency RANGE of tickers/id you want the prices from
 * @param {currency}                       by default "usd", only 1 parameter
 * @param {parseOptions}            an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a one-dimensional array containing the ATH price
 **/
async function GECKOATH(tickerArray, currency) {
  return await getCoinsMarketsData_(
    tickerArray,
    currency,
    true,
    (marketData) => marketData.ath,
    'GECKOATH'
  );
}

/** GECKOATL
 * Imports CoinGecko's cryptocurrency All Time Low Price into Google spreadsheets. The price feed is a ONE-dimensional array.
 * By default, data gets transformed into a number so it looks more like a normal price data import.
 * For example:
 *
 *   =GECKOATL("ethereum","EUR")
 *   =GECKOATL(a1:a10)
 *
 *
 * @param {cryptocurrencies}               the cryptocurrency RANGE of tickers/id you want the prices from
 * @param {currency}                       by default "usd", only 1 parameter
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a one-dimensional array containing the ATL prices
 **/
async function GECKOATL(tickerArray, currency) {
  return await getCoinsMarketsData_(
    tickerArray,
    currency,
    true,
    (marketData) => marketData.atl,
    'GECKOATL'
  );
}

/** GECKO24HIGH
 * Imports CoinGecko's cryptocurrency 24h High Prices into Google spreadsheets. The price feed is an array/tickers/ids.
 * By default, data gets transformed into a number number so it looks more like a normal price data import.
 * For example:
 *
 *   =GECKO24HIGH("ethereum","EUR")
 *   =GECKO24HIGH(a1:a10)
 *
 *
 * @param {cryptocurrencies}               the cryptocurrency RANGE of tickers/id you want the prices from
 * @param {currency}                       by default "usd", only 1 parameter
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return an array containing the 24hour high prices
 **/
async function GECKO24HIGH(tickerArray, currency) {
  return await getCoinsMarketsData_(
    tickerArray,
    currency,
    true,
    (marketData) => marketData.high_24h,
    'GECKO24HIGH'
  );
}

/** GECKO24LOW
 * Imports CoinGecko's cryptocurrency 24h Low Prices into Google spreadsheets. The price feed is a array.
 * By default, data gets transformed into a number so it looks more like a normal price data import.
 * For example:
 *
 *   =GECKO24LOW("ethereum","EUR")
 *   =GECKO24LOW(a1:a10)
 *
 *
 * @param {cryptocurrencies}               the cryptocurrency RANGE of tickers/id you want the prices from
 * @param {currency}                       by default "usd", only 1 parameter
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return an array containing the 24h low prices
 **/
async function GECKO24LOW(tickerArray, currency) {
  return await getCoinsMarketsData_(
    tickerArray,
    currency,
    true,
    (marketData) => marketData.low_24h,
    'GECKO24LOW'
  );
}

/** GECKOCAPBYNAME
 * Imports CoinGecko's cryptocurrency market capitalization into Google spreadsheets. The id_coin of cryptocurrency ticker is found in web address of Coingecko (https://www.coingecko.com/en/coins/bitcoin/usd). By default, it gets the market cap. If you need to get the fully diluted mktcap, specify the 3rd element as true.
 * For example for normal mkt cap:
 *
 *   =GECKOCAPBYNAME("bitcoin", "USD")
 *
 * For example for fully diluted mkt cap:
 *
 *   =GECKOCAPBYNAME("bitcoin", "USD",true)
 *
 * @param {id_coin}                 the id name of cryptocurrency ticker found in web address of Coingecko ex:https://www.coingecko.com/en/coins/bitcoin/usd, only 1 parameter
 * @param {against fiat currency}   the fiat currency ex: usd  or eur
 * @param {mktcap or fully diluted mktcap}  an optional boolean to get fully diluted valuation
 * @param {parseOptions}            an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a one-dimensional array containing the marketcap
 **/
async function GECKOCAPBYNAME(tickerArray, currency, diluted = false) {
  return await getCoinsMarketsData_(
    tickerArray,
    currency,
    false,
    (marketData) => +parseFloat(marketData[diluted ? 'fully_diluted_valuation' : 'market_cap']),
    'GECKOCAPBYNAME' + (diluted ? 'diluted' : '')
  );
}

/** GECKOVOLUMEBYNAME
 * Imports CoinGecko's cryptocurrency 24H Volume into Google spreadsheets. The id_coin of cryptocurrency ticker is found in web address of Coingecko (https://www.coingecko.com/en/coins/bitcoin/usd).
 * For example:
 *
 *   =GECKOVOLUMEBYNAME("bitcoin", "USD",$A$1)
 *
 *
 * @param {id_coin}                 the id name of cryptocurrency ticker found in web address of Coingecko ex:https://www.coingecko.com/en/coins/bitcoin/usd, only 1 parameter
 * @param {against fiat currency}   the fiat currency ex: usd  or eur
 * @param {parseOptions}            an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a one-dimensional array containing the 24h volume
 **/
async function GECKOVOLUMEBYNAME(tickerArray, currency) {
  return await getCoinsMarketsData_(
    tickerArray,
    currency,
    false,
    (marketData) => +parseFloat(marketData.total_volume),
    'GECKOVOLUMEBYNAME'
  );
}

/** GECKOLOGO
 * Imports CoinGecko's cryptocurrency Logos into Google spreadsheets.
 * For example:
 *
 *   =GECKOLOGO("BTC",$A$1)
 *
 *
 * @param {cryptocurrency}          the cryptocurrency ticker, only 1 parameter
 * @param {against fiat currency}   the fiat currency ex: usd  or eur
 * @param {parseOptions}            an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the logo image
 **/
async function GECKOLOGO(tickerArray) {
  return await getCoinsMarketsData_(
    tickerArray,
    'usd',
    true,
    (marketData) => marketData.image,
    'GECKOLOGO'
  );
}

/** GECKOLOGOBYNAME
 * Imports CoinGecko's cryptocurrency Logos into Google spreadsheets.
 * For example:
 *
 *   =GECKOLOGOBYNAME("bitcoin",$A$1)
 *
 *
 * @param {cryptocurrency}          the cryptocurrency id, only 1 parameter
 * @param {against fiat currency}   the fiat currency ex: usd  or eur
 * @param {parseOptions}            an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the logo image
 **/
async function GECKOLOGOBYNAME(tickerArray) {
  return await getCoinsMarketsData_(
    tickerArray,
    'usd',
    false,
    (marketData) => marketData.image,
    'GECKOLOGOBYNAME'
  );
}

const getCoinsMarketsData_ = async (tickerOrIdArray, currency, byTicker, dataMapper, tag) => {
  console.log('tickerArray:', tickerOrIdArray);
  console.log('currency:', currency);
  const { pairMatrix, coinIdSet, currencySet } = await getPairMatrixInfo_(
    tickerOrIdArray,
    currency,
    byTicker
  );

  const cacheId = getStringHash_(JSON.stringify(tickerOrIdArray || []) + currency + tag);
  const cached = cacheGet_(cacheId);
  if (cached) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }

  console.log('fetching data....');
  commonSleep_();
  const geckoData = await fetchCoinGeckoData_('coins/markets', {
    ids: [...coinIdSet].join(','),
    vs_currency: [...currencySet].join(',')
  });
  const dict = {};
  for (const marketData of geckoData) {
    dict[marketData.id] = dataMapper(marketData);
  }
  return pairMatrix.map((pairs) => pairs.map((pair) => (pair.id ? dict[pair.id] : '')));
};

/** GECKOHIST
 * Imports CoinGecko's cryptocurrency price change, volume change and market cap change into Google spreadsheets.
 * For example:
 *
 *   =GECKOHIST("BTC","LTC","price", "31-12-2020")
 *   =GECKOHIST("ethereum","USD","volume", "01-01-2021",false)
 *   =GECKOHIST("YFI","EUR","marketcap","06-06-2020",true)
 *
 *
 * @param {ticker}                 the cryptocurrency ticker, only 1 parameter
 * @param {ticker2}                the cryptocurrency ticker against which you want the %chage, only 1 parameter
 * @param {price,volume, or marketcap}   the type of change you are looking for
 * @param {date_ddmmyyy}           the date format dd-mm-yyy get open of the specified date, for close dd-mm-yyy+ 1day
 * @param {by_ticker boolean}       an optional true (data by ticker) false (data by id_name)
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a one-dimensional array containing the historical open price of BTC -LTC on the 31-12-2020
 **/
async function GECKOHIST(ticker, ticker2, type, date, byTicker = true) {
  ticker2 = ticker2.toLowerCase();
  type = type.toLowerCase();
  date = date.toString();
  const dataKey =
    type === 'price'
      ? 'current_price'
      : type === 'volume'
      ? 'total_volume'
      : type === 'marketcap'
      ? 'market_cap'
      : '';

  if (!dataKey) {
    throw 'Wrong parameter, either price, volume or marketcap';
  }

  // Gets a cache that is common to all users of the script.
  const cacheId = getStringHash_(ticker + ticker2 + type + date + 'hist');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    return JSON.parse(cached);
  }

  commonSleep_();
  const coinId = byTicker ? await fetchCoinId_(ticker) : ticker.toLowerCase();
  const geckoData = fetchCoinGeckoData_(`coins/${coinId}/history`, { date, localization: 'false' });
  const data = +parseFloat(geckoData.market_data[dataKey][ticker2]).toFixed(4);
  cachePut_(cacheId, JSON.stringify(data), expirationInSeconds);
  return data;
}

/** GECKOCHANGEBYNAME
 * Imports CoinGecko's cryptocurrency price change, volume change and market cap change into Google spreadsheets.
 * For example:
 *
 *   =GECKOCHANGE("bitcoin","LTC","price", 7)
 *   =GECKOCHANGE("Ehereum","USD","volume", 1)
 *   =GECKOCHANGE("litecoin","EUR","marketcap",365)
 *
 *
 * @param {ticker}                 the cryptocurrency ticker, only 1 parameter
 * @param {ticker2}                the cryptocurrency ticker/currency against which you want the %change, only 1 parameter
 * @param {price,volume, or marketcap}     the type of change you are looking for
 * @param {nb_days}                 the number of days you are looking for the price change, 365days=1year price change
 * @param {parseOptions}            an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a one-dimensional array containing the 7D%  price change on BTC (week price % change).
 **/
async function GECKOCHANGEBYNAME(id_coin, ticker2, type, days) {
  const coinId = id_coin.toLowerCase();
  ticker2 = ticker2.toLowerCase();
  type = type.toLowerCase();
  days = days.toString();

  const dataKey =
    type === 'price'
      ? 'prices'
      : type === 'volume'
      ? 'total_volumes'
      : type === 'marketcap'
      ? 'market_caps'
      : '';

  if (!dataKey) {
    throw 'Wrong parameter, either price, volume or marketcap';
  }

  // Gets a cache that is common to all users of the script.
  const cacheId = getStringHash_(coinId + ticker2 + type + days + 'changebyname');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    return JSON.parse(cached);
  }
  commonSleep_();
  const geckoData = fetchCoinGeckoData_(`coins/${coinId}/market_chart`, {
    vs_currency: ticker2,
    days
  });

  const val = +parseFloat(
    geckoData[dataKey][geckoData[dataKey].length - 1][1] / geckoData[dataKey][0][1] - 1
  ).toFixed(4);

  cachePut_(cacheId, JSON.stringify(val), expirationInSeconds);
  return val;
}

/** GECKO_ID_DATA
 * Imports CoinGecko's cryptocurrency data point, ath, 24h_low, market cap, price... into Google spreadsheets.
 * For example:
 *
 *   =GECKO_ID_DATA("bitcoin","market_data/ath/usd", false) => [[data]]
 *   =GECKO_ID_DATA("ETH","market_data/ath_change_percentage") => [[data]]
 *   =GECKO_ID_DATA("LTC","market_data/high_24h/usd",true) => [[data]]
 *   =GECKO_ID_DATA("LTC",A1:C1,true) => [[data1, data2, data3]]
 *
 *
 * @param {ticker}                 ticker Cryptocurrency ticker, only 1 parameter
 * @param {parameter}              parameters Parameter separated by "/" ex: "market_data/ath/usd" or "market_data/high_24h/usd"
 * @param {by_ticker boolean}      byTicker Optional true (data by ticker) false (data by id_name)
 * @param {parseOptions}           parseOptions Optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a one-dimensional array containing the specified parameter.
 **/
async function GECKO_ID_DATA(ticker, parameters, byTicker = true) {
  console.log('ticker: ' + ticker);
  console.log('parameters: ' + parameters);
  console.log('byTicker: ' + byTicker);

  if (!Array.isArray(parameters)) {
    parameters = [[parameters]];
  }

  const cacheId = getStringHash_(JSON.stringify(parameters) + '_' + ticker);
  const cachedValue = cacheGet_(cacheId);
  if (cachedValue) {
    console.log('Using cached value');
    return JSON.parse(cachedValue);
  }
  console.log('Not using cached value');

  commonSleep_();
  const coinId = byTicker ? await fetchCoinId_(ticker) : ticker.toLowerCase().trim();

  const geckoData = await fetchCoinGeckoData_(`coins/${coinId}`);
  const result = parameters.map((parameterList) =>
    parameterList
      .map(mapParmKeyToParamPath_)
      .map((paramPath) => getDataPathItem_(geckoData, paramPath))
  );
  cachePut_(cacheId, JSON.stringify(result));
  return result;
}

/** GECKOCHANGE
 * Imports CoinGecko's cryptocurrency price change, volume change and market cap change into Google spreadsheets.
 * For example:
 *
 *   =GECKOCHANGE("BTC","LTC","price", 7)
 *   =GECKOCHANGE("ETH","USD","volume", 1)
 *   =GECKOCHANGE("YFI","EUR","marketcap",365)
 *
 *
 * @param {ticker}                 the cryptocurrency ticker, only 1 parameter
 * @param {ticker2}                the cryptocurrency ticker against which you want the %chaNge, only 1 parameter
 * @param {price,volume, or marketcap}     the type of change you are looking for
 * @param {nb_days}                 the number of days you are looking for the price change, 365days=1year price change
 * @param {parseOptions}            an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a one-dimensional array containing the 7D%  price change on BTC (week price % change).
 **/
async function GECKOCHANGE(ticker, ticker2, type, days) {
  ticker = ticker.toUpperCase();
  ticker2 = ticker2.toLowerCase();
  type = type.toLowerCase();
  days = days.toString();

  const dataKey =
    type === 'price'
      ? 'prices'
      : type === 'volume'
      ? 'total_volumes'
      : type === 'marketcap'
      ? 'market_caps'
      : '';

  if (!dataKey) {
    throw 'Wrong parameter, either price, volume or marketcap';
  }

  // Gets a cache that is common to all users of the script.
  const cacheId = getStringHash_(ticker + ticker2 + type + days + 'change');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    return JSON.parse(cached);
  }

  commonSleep_();
  const coinId = fetchCoinId_(ticker);
  const geckoData = fetchCoinGeckoData_(`coins/${coinId}/market_chart`, {
    vs_currency: ticker2,
    days
  });
  const data = parseFloat(
    geckoData[dataKey][geckoData[dataKey].length - 1][1] / geckoData[dataKey][0][1] - 1
  ).toFixed(4);
  cachePut_(cacheId, JSON.stringify(data));
  return data;
}

/** GECKOCHART
 * Imports array of CoinGecko's cryptocurrency price change, volume change and market cap change into Google spreadsheets.
 * For example:
 *
 *   =GECKOCHART("BTC","LTC","price", 7)
 *   =GECKOCHART("ETH","USD","volume", 1)
 *   =GECKOCHART("YFI","EUR","marketcap",365)
 *
 * Feed into sparkline as:
 *
 *   =SPARKLINE(GECKOCHART("BTC","USD","price",7))
 *
 * @param {ticker}                 the cryptocurrency ticker, only 1 parameter
 * @param {ticker2}                the cryptocurrency ticker against which you want the %chaNge, only 1 parameter
 * @param {price,volume, or marketcap}     the type of change you are looking for
 * @param {nb_days}                 the number of days you are looking for the price change, 365days=1year price change
 * @param {str_freq}           frequency of data, possible value: daily
 * @param {parseOptions}            an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a one-dimensional array containing the price/volume/cap to be fed into sparkline
 **/
async function GECKOCHART(ticker, ticker2, type, days, interval = 'daily') {
  ticker = ticker.toUpperCase();
  ticker2 = ticker2.toLowerCase();
  type = type.toLowerCase();
  days = days.toString();

  const dataKey =
    type === 'price'
      ? 'prices'
      : type === 'volume'
      ? 'total_volumes'
      : type === 'marketcap'
      ? 'market_caps'
      : '';

  if (!dataKey) {
    throw 'Wrong parameter, either price, volume or marketcap';
  }

  // Gets a cache that is common to all users of the script.
  const cacheId = getStringHash_(ticker + ticker2 + type + days + 'chart');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    return JSON.parse(cached);
  }
  commonSleep_();
  const coinId = fetchCoinId_(ticker);
  const geckoData = fetchCoinGeckoData_(`coins/${coinId}/market_chart`, {
    vs_currency: ticker2,
    days,
    interval
  });
  const data = geckoData[dataKey].map((tuple) => tuple[1]);
  cachePut_(cacheId, JSON.stringify(data));
  return data;
}

/** COINGECKO_ID
 * Imports CoinGecko's id_coin of cryptocurrency ticker, which can be found in web address of Coingecko (https://api.coingecko.com/api/v3/search?locale=fr&img_path_only=1).
 * For example:
 *
 *   =GCOINGECKO_ID("BTC")
 *
 *
 * @param {ticker}                 the ticker of cryptocurrency ticker, only 1 parameter
 * @customfunction
 *
 * @returns the Coingecko ID
 **/
async function COINGECKO_ID(ticker) {
  return await fetchCoinId_(ticker);
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

const fetchCoinId_ = async (ticker) => {
  ticker = ticker.toLowerCase();
  if (CoinTickerToCoinIdCache[ticker]) {
    return CoinTickerToCoinIdCache[ticker];
  }
  const res = await fetchCoinGeckoData_('search', { locale: 'fr', img_path_only: '1' });
  ticker = ticker.toUpperCase();
  const coin = res.coins.find((coin) => coin.symbol === ticker);
  return coin?.id?.toString();
};

const getPairMatrixInfo_ = async (tickerOrIdArray, currencyArray, byTicker) => {
  const coinIdSet = new Set();
  const currencySet = new Set();
  const tickerToId = {};
  const pairMatrix = [];
  const tickerOrIdRow = [].concat(tickerOrIdArray);
  const currencyRow = [].concat(currencyArray);

  if (tickerOrIdRow.length !== currencyRow.length && typeof currencyArray !== 'string') {
    throw 'Ticker array and currency array need to be the same size and dimension';
  }

  for (let i = 0; i < tickerOrIdRow.length; ++i) {
    const tickerOrIdCol = [].concat(tickerOrIdRow[i]);
    const currencyCol = [].concat(currencyRow[i]);
    pairMatrix.push([]);

    if (tickerOrIdCol.length !== currencyCol.length && typeof currencyArray !== 'string') {
      throw 'Ticker array and currency array need to be the same size and dimension';
    }

    for (let j = 0; j < tickerOrIdCol.length; ++j) {
      const tickerOrId = (tickerOrIdCol[j] || '').toLowerCase().trim();
      const currency =
        (typeof currencyArray !== 'string'
          ? (currencyCol[j] || '').toLowerCase().trim()
          : currencyArray.toLowerCase().trim()) || 'usd';
      if (!tickerOrId) {
        pairMatrix[i].push({});
        continue;
      }
      if (!Object.prototype.hasOwnProperty.call(tickerToId, tickerOrId)) {
        tickerToId[tickerOrId] = byTicker ? await fetchCoinId_(tickerOrId) : tickerOrId;
      }
      const id = tickerToId[tickerOrId];
      pairMatrix[i].push({ id, currency });
      coinIdSet.add(id);
      currencySet.add(currency);
    }
  }

  return {
    pairMatrix,
    coinIdSet: [...coinIdSet].filter((v) => v),
    currencySet: [...currencySet].filter((v) => v)
  };
};
