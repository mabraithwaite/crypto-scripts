/*====================================================================================================================================*
  CryptoTools Google Sheet Feed by Eloise1988
  ====================================================================================================================================
  Version:      2.0.9
  Project Page: https://github.com/Eloise1988/CRYPTOBALANCE
  Copyright:    (c) 2021 by Eloise1988
                
  License:      MIT License
               
  ------------------------------------------------------------------------------------------------------------------------------------
  A library for importing ones balances, staking, rewards, lending & farming rates, dex volume & fees, uniswap new pairs into Google spreadsheets. Functions include:
     CRYPTOBALANCE                For use by end users to retrieve blockchain balances
     CRYPTOSTAKING                For use by end users to retrieve cryptocurrency staking amounts
     CRYPTOREWARSD                For use by end users to retrieve cryptocurrency reward amounts from staking
     CRYPTOLENDING                For use by end users to retrieve cryptocurrency lending/borrowing rates from dex echanges
     CRYPTODISTRIBUTIONRATE       For use by end users to retrieve the distribution token rate from lending plateforms (COMPOUND)
     CRYPTOSUMETH                 For use by end users to retrieve one's total $ amount on ERC20 address
     CRYPTOSUMBSC                 For use by end users to retrieve one's total $ amount on BEP20 address
     CRYPTODEXVOLUME              For use by end users to retrieve DEX volumes $
     CRYPTODEXFEE                 For use by end users to retrieve DEX transaction fees
     CRYPTOTVL                    For use by end users to retrieve Total Value Locked in Defi projects
     UNISWAP                      For use by end users to retrieve all new pairs on Uniswap
     SUSHISWAP                    For use by end users to retrieve all new pairs on Sushiswap
     PANCAKESWAP                  For use by end users to retrieve all new pairs on Pancakeswap
     CRYPTODEXPRICE               For use by end users to retrieve DEX (decentralized exchanges) cryptocurrency pair prices
     CRYPTOFUTURES                For use by end users to retrieve BTC, ETH Futures Prices, basis, volume, open interest
     CRYPTOLP                     For use by end users to retrieve data from Liquidity Pools, APR, APY, TVL from DEX 
     CRYPTO_ERC20HOLDERS          For use by end users to retrieve list of bigget holders by ERC20 contract address
     CRYPTO_BEP20HOLDERS          For use by end users to retrieve list of bigget holders by ERC20 contract address
     CRYPTOTX_ERC20               For use by end users to retrieve list of all ETH & ERC20 Token transactions
     CRYPTOTX_BEP20               For use by end users to retrieve list of all BNB & BEP20 Token transactions
     CRYPTOPOOLPRICE              For use by end users to retrieve prices from decentralized Pool tokens
     CRYPTOFARMING                For use by end users to retrieve TVL, APR, APY from decentralized Pool / tokens
  
  For bug reports see https://github.com/Eloise1988/CRYPTOBALANCE/issues
  ------------------------------------------------------------------------------------------------------------------------------------
  Changelog:
  
  2.0.9  Release May 17th: Added CRYPTO_ERC20HOLDERS, CRYPTO_BEP20HOLDERS, CRYPTOTX_ERC20, CRYPTOTX_BEP20 +
         May 24th Modification CACHE
         May27th CRYPTOTX_ERC20, CRYPTOTX_BEP20 number days old addition
         June 1st UNISWAP SUSHISWAP exception handling
         June 7th NEW CRYPTOPOOLPRICE + CRYPTOFARMING
         June 20th UPDATE DEXPRICE METHOD + latest PancakeswapV2 prices
         June 23th UPDATE LENDING RATE METHOD
         July 9th API-KEY for premium users 
         July 25th CRYPTOSUMBSC function retrieves the total $ amount on BEP20 address
 *====================================================================================================================================*/ //CACHING TIME

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('CRYPTOTOOLS')
    .addItem('CRYPTOBALANCE', 'ShowHowToRefresh')
    .addSeparator()
    .addItem('CRYPTOSTAKING', 'ShowHowCRYPTOSTAKING')
    .addSeparator()
    .addItem('CRYPTOREWARDS', 'ShowHowCRYPTOREWARDS')
    .addSeparator()
    .addItem('CRYPTOLENDING', 'ShowHowCRYPTOLENDING')
    .addSeparator()
    .addSeparator()
    .addItem('PREMIUM', 'ShowContactInfo')
    .addSeparator()
    .addItem('Contact Info', 'ShowContactInfo')
    .addToUi();
}

/**CRYPTOBALANCE
 * Returns cryptocurrency balances into Google spreadsheets. The result is a ONE-dimensional array.
 * By default, data gets transformed into a number so it looks more like a normal price data import.
 * For example:
 *
 *   =CRYPTOBALANCE("BTC", "14ByqnCtawEV1VdQbLqxYWPdey1JbfpwRy","$A$1")
 *
 * @param {cryptocurrency}  the cryptocurrency TICKER/SYMBOL data to fetch, for example the symbol of Bitcoin is BTC.
 * @param {address}         the wallet address associated to the cryptocurrency you want the balance from. Please pay attention, DO NOT TO ENTER your private wallet address.
 * @param {parseOptions}    an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a one-dimensional array the balance of cryptocurrency
 **/
async function CRYPTOBALANCE(ticker, address) {
  console.log('ticker:', ticker);
  console.log('address:', address);

  ticker = (ticker || '').toUpperCase().trim();
  address = (address || '').trim();

  checkInput_(!!ticker, 'Expected ticker value');
  checkInput_(!!address, 'Expected address value');

  const cacheId = getStringHash_(ticker + address + 'CRYPTOBALANCE');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const balance = tryParseNumber_(await fetchCryptoToolsData_(`BALANCE/${ticker}/${address}`));
  if (typeof balance === 'number') {
    cachePut_(cacheId, JSON.stringify(balance));
  }
  return balance;
}

/**CRYPTOREWARDS
 * Returns cryptocurrency REWARDS on PoS cryptocurrencies into Google spreadsheets.The result is a ONE-dimensional array.
 * By default, data gets transformed into a value amount.
 * For example:
 *
 * =CRYPTOREWARDS("ATOM","cosmos1r0y7s2vrgk3nw3nkp5tyy8zxjkz7nw9vrvmxun",$A$1)
 *
 * @param {cryptocurrency}         the cryptocurrency ticker you want the rewards from
 * @param {address}                the wallet address associated to the cryptocurrency you want the rewards from. Please pay attention, DO NOT TO ENTER your private wallet address.
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the current cryptocurrency rewards from PoS
 **/
async function CRYPTOREWARDS(ticker, address) {
  console.log('ticker:', ticker);
  console.log('address:', address);

  ticker = (ticker || '').toUpperCase().trim();
  address = (address || '').trim();

  checkInput_(!!ticker, 'Expected ticker value');
  checkInput_(!!address, 'Expected address value');

  const cacheId = getStringHash_(ticker + address + 'CRYPTOREWARDS');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const rewards = tryParseNumber_(await fetchCryptoToolsData_(`REWARDS/${ticker}/${address}`));
  cachePut_(cacheId, JSON.stringify(rewards));
  return rewards;
}

/**CRYPTOSTAKING
 * Returns the amount STAKED on PoS cryptocurrencies into Google spreadsheets.The result is a ONE-dimensional array.
 * By default, data gets transformed into a value amount.
 * For example:
 *
 * =CRYPTOSTAKING("EOS","okbtothemoon",$A$1)
 *
 * @param {cryptocurrency}         the cryptocurrency ticker you want the amounts of staking from
 * @param {address}                the wallet address associated to the cryptocurrency. Please pay attention, DO NOT TO ENTER your private wallet address.
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the current amount staked on a cryptocurrency
 **/
async function CRYPTOSTAKING(ticker, address) {
  console.log('ticker:', ticker);
  console.log('address:', address);

  ticker = (ticker || '').toUpperCase().trim();
  address = (address || '').trim();

  checkInput_(!!ticker, 'Expected ticker value');
  checkInput_(!!address, 'Expected address value');

  const cacheId = getStringHash_(ticker + address + 'CRYPTOSTAKING');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const staking = tryParseNumber_(await fetchCryptoToolsData_(`STAKING/${ticker}/${address}`));
  if (typeof staking === 'number') {
    cachePut_(cacheId, JSON.stringify(staking));
  }
  return staking;
}

/**CRYPTOSUMETH
 * Returns the total $ amount on an ERC20 address into Google spreadsheets.The result is a ONE-dimensional array.
 * By default, data gets transformed into a number.
 * For example:
 *
 * =CRYPTOSUMETH("0xd47297cdcf36eed17305d6a5471c6cd482c7e91c", $A$1)
 *
 * @param {address}                the erc20 wallet address you want the sum from
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the current total amount of $ on an ERC20 address
 **/
async function CRYPTOSUMETH(address) {
  console.log('address:', address);

  address = (address || '').trim();

  checkInput_(!!address, 'Expected address value');

  const cacheId = getStringHash_(address + 'CRYPTOSUMETH');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const sum = tryParseNumber_(await fetchCryptoToolsData_(`TOTALETHBALANCE/${address}`));
  if (typeof sum === 'number') {
    cachePut_(cacheId, JSON.stringify(sum));
  }
  return sum;
}

/**CRYPTOTVL
 * Returns DEXes' (decentralized exchanges) Total Cryptocurrency Value Locked.The result is a ONE-dimensional array.
 *
 * List of DEXes
 * Uniswap Maker WBTC Compound Aave Curve Finance Synthetix Harvest Finance yearn.financeRenVM Balancer SushiSwap InstaDApp C.R.E.A.M. Finance Nexus Mutual dForce
 * Flexa mStable dYdX Set Protocol DODO ForTube Bancor Loopring Lightning Network bZxMetronomeKyber DFI.money Gnosis xDai DeversiFi Erasure PieDAO DDEX Opyn Melon
 * MCDEX Augur Robo-Advisor for Yield ACO Opium Network Connext 1
 *
 * By default, data gets transformed into a decimal number.
 * For example:
 *
 * =CRYPTOTVL("MAKER")
 *
 * @param {DEX}                    the name of the DEX  ex:AAVE
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the current TVL ($) in decimal form,  on specified DEX
 **/
async function CRYPTOTVL(exchange) {
  console.log('exchange:', exchange);

  exchange = (exchange || '').trim();

  checkInput_(!!exchange, 'Expected exchange value');

  const cacheId = getStringHash_(exchange + 'CRYPTOTVL');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const tvl = tryParseNumber_(await fetchCryptoToolsData_(`TVL/${exchange}`));
  if (typeof tvl === 'number') {
    cachePut_(cacheId, JSON.stringify(tvl));
  }
  return tvl;
}

/**CRYPTODEXVOLUME
 * Returns DEXes' (decentralized exchanges) 24H Volume.The result is a ONE-dimensional array.
 *
 * List of DEXes
 * Uniswap Maker WBTC Compound Aave Curve Finance Synthetix Harvest Finance yearn.financeRenVM Balancer SushiSwap InstaDApp C.R.E.A.M. Finance Nexus Mutual dForce
 * Flexa mStable dYdX Set Protocol DODO ForTube Bancor Loopring Lightning Network bZxMetronomeKyber DFI.money Gnosis xDai DeversiFi Erasure PieDAO DDEX Opyn Melon
 * MCDEX Augur Robo-Advisor for Yield ACO Opium Network Connext 1
 *
 * By default, data gets transformed into a decimal number.
 * For example:
 *
 * =CRYPTODEXVOLUME("LEND")
 *
 * @param {DEX}                    the name of the DEX  ex:AAVE or ticker LEND
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the 24h DEX Volume in decimal form,  on specified DEX
 **/
async function CRYPTODEXVOLUME(exchange) {
  console.log('exchange:', exchange);

  exchange = (exchange || '').trim();

  checkInput_(!!exchange, 'Expected exchange value');

  const cacheId = getStringHash_(exchange + 'CRYPTODEXVOLUME');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const volume = tryParseNumber_(await fetchCryptoToolsData_(`DEXVOLUME/${exchange}`));
  if (typeof volume === 'number') {
    cachePut_(cacheId, JSON.stringify(volume));
  }
  return volume;
}

/**CRYPTODEXFEE
 * Returns DEXes' (decentralized exchanges) takers fee that compensates liquidity providers.The result is a ONE-dimensional array.
 *
 * List of DEXes
 * Uniswap Maker WBTC Compound Aave Curve Finance Synthetix Harvest Finance yearn.financeRenVM Balancer SushiSwap InstaDApp C.R.E.A.M. Finance Nexus Mutual dForce
 * Flexa mStable dYdX Set Protocol DODO ForTube Bancor Loopring Lightning Network bZxMetronomeKyber DFI.money Gnosis xDai DeversiFi Erasure PieDAO DDEX Opyn Melon
 * MCDEX Augur Robo-Advisor for Yield ACO Opium Network Connext 1
 *
 * By default, data gets transformed into a decimal number.
 * For example:
 *
 * =CRYPTODEXFEE("MAKER")
 *
 * @param {DEX}                    the name of the DEX  ex:Maker or ticker:MKR
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the current takers' fee in decimal form,  on specified DEX
 **/
async function CRYPTODEXFEE(exchange) {
  console.log('exchange:', exchange);
  exchange = (exchange || '').trim();
  checkInput_(!!exchange, 'Expected exchange value');

  const cacheId = getStringHash_(exchange + 'CRYPTODEXFEE');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const fee = tryParseNumber_(await fetchCryptoToolsData_(`DEXFEE/${exchange}`));
  if (typeof fee === 'number') {
    cachePut_(cacheId, JSON.stringify(fee));
  }
  return fee;
}

/**UNISWAP
 * Returns new tradable pairs on Uniswap, giving constraints on the number of Days Active, the Volume ($), the Liquidity ($), the number of Transactions
 *
 * By default, data gets transformed into a table
 * For example:
 *
 * =UNISWAP(5,10000,10000,100)
 *
 * @param {days}                   the number of Days since the pair is active
 * @param {volume}                 the minimum Volume ($)
 * @param {liquidity}              the minimum Liquidity ($)
 * @param {txCount}                the number of Transactions existant since creation
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a table with all new tradable pairs on Uniswap and their number of Days since Active, the Volume ($), the Liquidity ($), the number of Transactions
 **/
async function UNISWAP(days, volume, liquidity, txCount) {
  console.log('days:', days);
  console.log('volume:', volume);
  console.log('liquidity:', liquidity);
  console.log('txCount:', txCount);

  checkInput_(days != null, 'Expected days value');
  checkInput_(volume != null, 'Expected volume value');
  checkInput_(liquidity != null, 'Expected liquidity value');
  checkInput_(txCount != null, 'Expected txCount value');

  commonSleep_();
  return await fetchCryptoToolsData_(
    `UNISWAPFILTER/${days}/${volume}/${liquidity}/${txCount}`,
    undefined,
    undefined,
    { advanced: true }
  );
}

/**SUSHISWAP
 * Returns new tradable pairs on Sushiswap, giving constraints on the number of Days Active, the Volume ($), the Liquidity ($), the number of Transactions
 *
 * By default, data gets transformed into a table
 * For example:
 *
 * =SUSHISWAP(5,10000,10000,100)
 *
 * @param {days}                    the number of Days since the pair is active
 * @param {volume}                  the minimum Volume ($)
 * @param {liquidity}               the minimum Liquidity ($)
 * @param {txCount}                the number of Transactions existant since creation
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a table with all new tradable pairs on Sushiswap and their number of Days since Active, the Volume ($), the Liquidity ($), the number of Transactions
 **/
async function SUSHISWAP(days, volume, liquidity, txCount) {
  console.log('days:', days);
  console.log('volume:', volume);
  console.log('liquidity:', liquidity);
  console.log('txCount:', txCount);

  checkInput_(days != null, 'Expected days value');
  checkInput_(volume != null, 'Expected volume value');
  checkInput_(liquidity != null, 'Expected liquidity value');
  checkInput_(txCount != null, 'Expected txCount value');

  commonSleep_();
  return await fetchCryptoToolsData_(
    `SUSHISWAPFILTER/${days}/${volume}/${liquidity}/${txCount}`,
    undefined,
    undefined,
    { advanced: true }
  );
}

/**PANCAKESWAP
 * Returns new tradable pairs on Pancakeswap, giving constraints on the number of Days Active, the Volume ($), the Liquidity ($), the number of Transactions
 *
 * By default, data gets transformed into a table
 * For example:
 *
 * =PANCAKESWAP(5,10000,10000,100)
 *
 * @param {days}                    the number of Days since the pair is active
 * @param {volume}                  the minimum Volume ($)
 * @param {liquidity}               the minimum Liquidity ($)
 * @param {txCount}                the number of Transactions existant since creation
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a table with all new tradable pairs on Sushiswap and their number of Days since Active, the Volume ($), the Liquidity ($), the number of Transactions
 **/
async function PANCAKESWAP(days, volume, liquidity, txCount) {
  console.log('days:', days);
  console.log('volume:', volume);
  console.log('liquidity:', liquidity);
  console.log('txCount:', txCount);

  checkInput_(days != null, 'Expected days value');
  checkInput_(volume != null, 'Expected volume value');
  checkInput_(liquidity != null, 'Expected liquidity value');
  checkInput_(txCount != null, 'Expected txCount value');

  commonSleep_();
  return await fetchCryptoToolsData_(
    `PANCAKESWAPFILTER/${days}/${volume}/${liquidity}/${txCount}`,
    undefined,
    undefined,
    { advanced: true }
  );
}

/**CRYPTOFUTURES
 * Returns BTC or ETH Futures Prices, basis, volume, open interest
 *
 * By default, data gets transformed into a table
 * For example:
 *
 * =CRYPTOFUTURES("BTC")
 *
 * @param {ticker}                 BTC and ETH, for more markets contact https://t.me/TheCryptoCurious
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a table with all Id,	Exchange,	Price,	24h	Index Price,	Basis,	Spread,	Expiry,	Open Interest,	24h Volume	 for BTC and ETH futures
 **/
async function CRYPTOFUTURES(ticker) {
  console.log('ticker:', ticker);
  ticker = (ticker || '').toUpperCase().trim();
  checkInput_(!!ticker, 'Expected ticker input');
  commonSleep_();
  return await fetchCryptoToolsData_(`${ticker}FUTURES`, undefined, undefined, { advanced: true });
}

/**CRYPTODISTRIBUTIONRATE
 * Returns cryptocurrency lending rates on different lending plateforms into Google spreadsheets.The result is a ONE-dimensional array.
 * By default, data gets transformed into a decimal number.
 * For example:
 *
 * =CRYPTODISTRIBUTIONRATE("COMPOUND","ETH","APR_BORROW")
 *
 * @param {exchange}               the exchange on which you want to retrieve the token distribution rate (only COMPOUND available)
 * @param {cryptocurrency}         the cryptocurrency ticker you want the lending/borrowing distribution rate from
 * @param {APR_BORROW or APR_LEND} either APR_BORROW for the borrowing rate or APR_LEND for the distribution rate
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the current distribution rate in decimal form,  of cryptocurrency on a specified exchange
 **/
async function CRYPTODISTRIBUTIONRATE(exchange, ticker, side) {
  console.log('exchange:', exchange);
  console.log('ticker:', ticker);
  console.log('side:', side);

  ticker = (ticker || '').toUpperCase().trim();
  exchange = (exchange || '').toUpperCase().trim();
  side = (side || '').toUpperCase().trim();

  checkInput_(!!ticker, 'Expected ticker input');
  checkInput_(!!exchange, 'Expected exchange input');
  checkInput_(!!side, 'Expected side input');

  const cacheId = getStringHash_(ticker + exchange + side + 'CRYPTODISTRIBUTIONRATE');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const distributionRate = tryParseNumber_(
    await fetchCryptoToolsData_(`DISTRIBUTIONRATE/${exchange}/${ticker}/${side}`)
  );
  if (typeof distributionRate === 'number') {
    cachePut_(cacheId, JSON.stringify(content));
  }
  return distributionRate;
}

/**CRYPTOLP
 * Returns cryptocurrency lending rates on different lending plateforms into Google spreadsheets.The result is a ONE-dimensional array.
 * By default, data gets transformed into a decimal number.
 * For example:
 *
 * =CRYPTOLP("CAKE","BUSD-WBNB","APR")
 *
 * @param {exchange}               DEX exchange ticker for the LP
 * @param {pair}         the cryptocurrency pair ex: WBTC-WETH
 * @param {APR or TVL} either APR_BORROW for the borrowing rate or APR_LEND for the distribution rate
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the APR or TVL from specific liquidity pool
 **/
async function CRYPTOLP(exchange, pair, type) {
  console.log('exchange:', exchange);
  console.log('pair:', pair);
  console.log('type:', type);

  exchange = (exchange || '').toUpperCase().trim();
  pair = (pair || '').toUpperCase().replace('-', '').replace('/', '').trim();
  type = (type || '').toUpperCase().trim();

  checkInput_(!!exchange, 'Expected exchange input');
  checkInput_(!!pair, 'Expected pair input');
  checkInput_(!!type, 'Expected type input');

  const cacheId = getStringHash_(exchange + pair + type + 'CRYPTOLP');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const lp = tryParseNumber_(await fetchCryptoToolsData_(`LPOOLS/${exchange}/${pair}/${type}`));
  if (typeof lp === 'number') {
    cachePut_(cacheId, lp);
  }
  return lp;
}

/**CRYPTO_ERC20HOLDERS
 * Returns a table of the 150 biggest holders by contract address or ticker into Google spreadsheets.
 * By default, json data gets transformed into a a table 151x3.
 * For example:
 *
 * =CRYPTO_ERC20HOLDERS("MKR")
 * =CRYPTO_ERC20HOLDERS("0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2")
 *
 * @param {ticker}       ticker or contract_address if ticker is not available
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return table with the top 150 holders of cryptocurrency
 **/
async function CRYPTO_ERC20HOLDERS(ticker) {
  console.log('ticker:', ticker);
  ticker = (ticker || '').toUpperCase().trim();
  checkInput_(!!ticker, 'Expected ticker input');
  commonSleep_();
  return await fetchCryptoToolsData_(`ERC20HOLDERS/${ticker}`, undefined, undefined, {
    advanced: true,
    options: { parseOptions: 'noInherit,noTruncate,rawHeaders,noHeaders' }
  });
}

/**CRYPTO_BEP20HOLDERS
 * Returns a table of the 1000 biggest holders by contract address or ticker into Google spreadsheets.
 * By default, json data gets transformed into a a table 1000x3.
 * For example:
 *
 * =CRYPTO_BEP20HOLDERS("CAKE")
 * =CRYPTO_BEP20HOLDERS("0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82")
 *
 * @param {ticker}                 ticker or contract_address if ticker is not available
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return table with the top 1000 holders of BEP20 cryptocurrency
 **/
async function CRYPTO_BEP20HOLDERS(ticker) {
  console.log('ticker:', ticker);
  ticker = (ticker || '').toUpperCase().trim();
  checkInput_(!!ticker, 'Expected ticker input');
  commonSleep_();
  return await fetchCryptoToolsData_(`BEP20HOLDERS/${ticker}`, undefined, undefined, {
    advanced: true,
    options: { parseOptions: 'noInherit,noTruncate,rawHeaders,noHeaders' }
  });
}

/**CRYPTOTX_ERC20
 * Returns a table with the list of transactions for an ERC20 wallet address into Google spreadsheets filtered by days old.
 * By default, json data gets transformed into a a table.
 * For example:
 *
 * =CRYPTOTX_ERC20("0xf50d9b37e86ff69bc3d7a18bf3d5a04d5ef6cad1",10)
 *
 * @param {address}       the ERC20 address you want the list of transactions from
 * @param {nbdays}         optional number of days old, 30d by default
 * @param {parseOptions}   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return table with all ETH + ERC20 Token transactions (date, to, from, value, ticker)
 **/
async function CRYPTOTX_ERC20(address, nbdays) {
  console.log('address:', address);
  console.log('nbdays:', nbdays);

  address = (address || '').trim();
  if (nbdays == null) nbdays = 30;

  checkInput_(!!address, 'Expected address input');
  checkInput_(!!nbdays, 'Expected nbdays input');

  commonSleep_();
  return await fetchCryptoToolsData_(`TXERC20/${address}/${nbdays}`, undefined, undefined, {
    advanced: true,
    options: { parseOptions: 'noInherit,noTruncate,rawHeaders,noHeaders' }
  });
}

/**CRYPTOTX_BEP20
 * Returns a table with the list of transactions for an BEP20 wallet address (Binance Smart Chain) into Google spreadsheets filtered by days old.
 * By default, json data gets transformed into a a table.
 * For example:
 *
 * =CRYPTOTX_BEP20("0x921112cb26e4bda59ee4d769a99ad70e88c00019",10)
 *
 * @param {address}       the BEP20 address you want the list of transactions from (Binance Smart Chain)
 * @param {nbdays}        optional number of days old, 30d by default
 * @param {parseOptions}  an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return table with all BNB + BEP20 Token transactions (date, to, from, value, ticker)
 **/
async function CRYPTOTX_BEP20(address, nbdays) {
  console.log('address:', address);
  console.log('nbdays:', nbdays);

  address = (address || '').trim();
  if (nbdays == null) nbdays = 30;

  checkInput_(!!address, 'Expected address input');
  checkInput_(!!nbdays, 'Expected nbdays input');

  commonSleep_();
  return await fetchCryptoToolsData_(`TXBEP20/${address}/${nbdays}`, undefined, undefined, {
    advanced: true,
    options: { parseOptions: 'noInherit,noTruncate,rawHeaders,noHeaders' }
  });
}

/**CRYPTOPOOLPRICE
 * Returns prices from decentralized Pool tokens.
 *
 * List of available Pools
 * YEARN, BAL
 *
 * By default, data gets transformed into an array of decimal numbers.
 * For example:
 *
 * =CRYPTOPOOLPRICE("YVCURVE-BBTC","YEARN")
 * =CRYPTOPOOLPRICE(E39:E100,F39:F100)
 *
 * @param {Token_Name}             list of contract address you wish the Pool Price from
 * @param {Exchange}               list of exchanges on you wish the Pool Price from
 * @customfunction
 *
 * @return the current price  your cryptocurrency pool on specified DEX
 **/
async function CRYPTOPOOLPRICE(tokenNameArray, exchangeArray) {
  console.log('tokenNameArray:', tokenNameArray);
  console.log('exchangeArray:', exchangeArray);

  if (tokenNameArray.length > 1) {
    tokenNameArray = [].concat(tokenNameArray).join('%2C').trim();
    exchangeArray = [].concat(exchangeArray).join('%2C').trim();
  }

  checkInput_(!!exchangeArray, 'Expected exchange array input');
  checkInput_(!!tokenNameArray, 'Expected ticker array input');

  const cacheId = getStringHash_(tokenNameArray + exchangeArray + 'CRYPTOPOOLPRICE');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const cryptoData = JSON.parse(
    await fetchCryptoToolsData_(`POOLPRICE/${exchangeArray}/${tokenNameArray}`)
  );
  const dict = [];
  for (let i = 0; i < cryptoData.length; i++) {
    if (Object.prototype.hasOwnProperty.call(cryptoData[i], 'PRICE')) {
      dict.push(+cryptoData[i]['PRICE']);
    } else {
      dict.push('');
    }
  }
  cachePut_(cacheId, JSON.stringify(dict));
  return dict;
}

/**CRYPTOFARMING
 * Returns apr, apy and tvl from tokens or pools on decentralized exchanges
 *
 * By default, data gets transformed into an array of decimal numbers.
 * For example:
 *
 * =CRYPTOFARMING("SUSHI","UNI-WETH","APY")
 * =CRYPTOFARMING(E39:E100,F39:F100,J39:J100)
 *
 * @param {Exchange}               list of exchanges on you wish the dat from
 * @param {Token_Name}             list of token tickers/pairs
 * @param {Data_Type}              list of data_types: 'APR', 'APY', or 'TVL'
 * @customfunction
 *
 * @return the current APR, APY or TVL list for selected exchanges/tickers
 **/
async function CRYPTOFARMING(exchangeArray, tickerArray, dataType) {
  console.log('exchangeArray:', exchangeArray);
  console.log('tickerArray:', tickerArray);
  console.log('dataType:', dataType);

  if (exchangeArray.length > 1) {
    exchangeArray = [].concat(exchangeArray).join('%2C').replace('-', '').replace('/', '').trim();
    dataType = [].concat(dataType).join('%2C').replace('-', '').replace('/', '').trim();
    tickerArray = [].concat(tickerArray).join('%2C').replace('-', '').replace('/', '').trim();
  }

  checkInput_(!!exchangeArray, 'Expected exchange array input');
  checkInput_(!!tickerArray, 'Expected ticker array input');
  checkInput_(!!dataType, 'Expected data type array input');

  const cacheId = getStringHash_(tickerArray + exchangeArray + dataType + 'CRYPTOFARMING');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const cryptoData = JSON.parse(
    await fetchCryptoToolsData_(`LPOOLS/${exchangeArray}/${tickerArray}/${dataType}`)
  );
  const dict = [];
  for (let i = 0; i < cryptoData.length; i++) {
    if (Object.prototype.hasOwnProperty.call(cryptoData[i], 'VALUE')) {
      dict.push(+cryptoData[i]['VALUE']);
    } else {
      dict.push('');
    }
  }
  cachePut_(cacheId, JSON.stringify(dict));
  return dict;
}

/**CRYPTODEXPRICE
 * Returns DEXes' (decentralized exchanges) prices per pair of tokens.
 *
 * List of available DEXes
 * 1INCH, UNISWAP, PANCAKESWAP, SUSHISWAP, BONFIDA, BAL
 *
 * By default, data gets transformed into a decimal number.
 * For example:
 *
 * =CRYPTODEXPRICE("ETH","BAL","1INCH")
 * =CRYPTODEXPRICE(E39:E100,F39:F100,J39:J100)
 *
 * @param {Token1}                 1st ticker range or its contract address
 * @param {Token2}                 2st ticker range or its contract address
 * @param {Exchange}               ticker range of dex exchange on which you are looking for rate
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the current price rate of your cryptocurrency pair,  on specified DEX
 **/
async function CRYPTODEXPRICE(tokenArray1, tokenArray2, exchangeArray) {
  console.log('tokenArray1:', tokenArray1);
  console.log('tokenArray2:', tokenArray2);
  console.log('exchangeArray:', exchangeArray);

  if (exchangeArray.length > 1) {
    exchangeArray = [].concat(exchangeArray).join('%2C').replace('-', '').replace('/', '').trim();
    tokenArray1 = [].concat(tokenArray1).join('%2C').replace('-', '').replace('/', '').trim();
    tokenArray2 = [].concat(tokenArray2).join('%2C').replace('-', '').replace('/', '').trim();
  }

  checkInput_(!!exchangeArray, 'Expected exchange array input');
  checkInput_(!!tokenArray1, 'Expected token array input');
  checkInput_(!!tokenArray2, 'Expected token2 array input');

  const cacheId = getStringHash_(tokenArray1 + tokenArray2 + exchangeArray + 'CRYPTODEXPRICE');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const cryptoData = JSON.parse(
    await fetchCryptoToolsData_(`DEXPRICE2/${tokenArray1}/${tokenArray2}/${exchangeArray}`)
  );
  const dict = [];
  for (let i = 0; i < cryptoData.length; i++) {
    if (Object.prototype.hasOwnProperty.call(cryptoData[i], 'PRICE')) {
      dict.push(+cryptoData[i]['PRICE']);
    } else {
      dict.push('');
    }
  }
  cachePut_(cacheId, JSON.stringify(dict));
  return dict;
}

/**CRYPTOLENDING
 * Returns cryptocurrency lending rates on different lending plateforms into Google spreadsheets.The result is a ONE-dimensional array.
 * By default, data gets transformed into a decimal number.
 * For example:
 *
 * =CRYPTOLENDING("COMPOUND","ETH","APR_BORROW")
 * =CRYPTOLENDING(A1:A10,B1:B10,C1:C10)
 *
 * @param {exchange}               the exchanges on which you want to retrieve the lending rate
 * @param {cryptocurrency}         the cryptocurrency tickers you want the lending/borrowing rates from
 * @param {APR_BORROW or APR_LEND} either APR_BORROW for the borrowing rate or APR_LEND for the lending rate
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the current lending rate in decimal form, range of data if array of data was given
 **/
async function CRYPTOLENDING(exchangeArray, tickerArray, sideArray) {
  console.log('exchangeArray:', exchangeArray);
  console.log('tickerArray:', tickerArray);
  console.log('sideArray:', sideArray);

  if (exchangeArray.length > 1) {
    exchangeArray = [].concat(exchangeArray).join('%2C').replace('-', '').replace('/', '').trim();
    tickerArray = [].concat(tickerArray).join('%2C').replace('-', '').replace('/', '').trim();
    sideArray = [].concat(sideArray).join('%2C').replace('-', '').replace('/', '').trim();
  }

  checkInput_(!!exchangeArray, 'Expected exchange array input');
  checkInput_(!!tickerArray, 'Expected ticker array input');
  checkInput_(!!sideArray, 'Expected side array input');

  const cacheId = getStringHash_(exchangeArray + tickerArray + sideArray + 'CRYPTOLENDING');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const cryptoData = JSON.parse(
    await fetchCryptoToolsData_(`LENDING2/${exchangeArray}/${tickerArray}/${sideArray}`)
  );
  const dict = [];
  for (let i = 0; i < cryptoData.length; i++) {
    if (Object.prototype.hasOwnProperty.call(cryptoData[i], 'VALUE')) {
      dict.push(+cryptoData[i]['VALUE']);
    } else {
      dict.push('');
    }
  }
  cachePut_(cacheId, JSON.stringify(dict));
  return dict;
}

/**CRYPTOSUMBSC
 * Returns the total $ amount on an BEP20 address into Google spreadsheets.The result is a ONE-dimensional array.
 * By default, data gets transformed into a number.
 * For example:
 *
 * =CRYPTOSUMBSC("0x72a53cdbbcc1b9efa39c834a540550e23463aacb", $A$1)
 *
 * @param {address}                the bep20 wallet address you want the $ amount from
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return the current total amount of Binance Smart Chain on an BEP20 address
 **/
async function CRYPTOSUMBSC(address) {
  console.log('address:', address);
  address = (address || '').trim();
  checkInput_(!!address, 'Expected address input');

  const cacheId = getStringHash_(address + 'CRYPTOSUMBSC');
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    console.log('using cached data....');
    return JSON.parse(cached);
  }
  console.log('fetching data....');

  commonSleep_();
  const sum = tryParseNumber_(await fetchCryptoToolsData_(`TOTALBSCBALANCE/${address}`));
  if (typeof sum === 'number') {
    cachePut_(cacheId, JSON.stringify(sum));
  }
  return content;
}

const fetchCryptoToolsData_ = async (path, params, options, advancedParseOptions) => {
  const prefix = CRYPTOTOOLS_API_KEY ? 'privateapi' : 'api';
  const GSUUID = encodeURIComponent(Session.getTemporaryActiveUserKey()).replace(/%2f/gi, 'hello');
  const KEYID = PropertiesService.getUserProperties().getProperty('KEYID') || GSUUID;
  const apikey = CRYPTOTOOLS_API_KEY || KEYID;
  return await fetchData_({
    url: `https://${prefix}.charmantadvisory.com/${path}/${KEYID}`,
    params: { ...params },
    options: { ...options, headers: { ...(options || {}).headers, apikey } },
    ...(advancedParseOptions?.advanced
      ? {
          advancedParseOptions: {
            query: '',
            parseOptions: 'noInherit,noTruncate',
            includeFunc: includeXPath_,
            transformFunc: defaultTransform_,
            ...advancedParseOptions.options
          }
        }
      : {}),
    parseContent: false
  });
};
