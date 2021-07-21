async function CRYPTODEXPRICE(token1, token2, exchange) {
  Logger.log('token1: ' + token1);
  Logger.log('token2: ' + token2);
  Logger.log('exchange: ' + exchange);
  const cacheId = getStringHash_(JSON.stringify([token1, token2, exchange, 'dexprice']));
  const cached = cacheGet_(cacheId);
  if (cached != null) {
    Logger.log('Using cached value');
    return JSON.parse(cached);
  }
  Logger.log('Not using cached value');

  commonSleep_();
  const content = await fetchCryptoToolsData_(`DEXPRICE2/${token1}/${token2}/${exchange}`);
  const dict = content.map((v) =>
    Object.prototype.hasOwnProperty.call(v, 'PRICE') ? +v.PRICE : ''
  );
  cachePut_(cacheId, JSON.stringify(dict));
  return dict;
}

const fetchCryptoToolsData_ = async (path, params, options) => {
  const prefix = CRYPTOTOOLS_API_KEY ? 'privateapi' : 'api';
  const GSUUID = encodeURIComponent(Session.getTemporaryActiveUserKey()).replace(/%2f/gi, 'hello');
  const KEYID = PropertiesService.getUserProperties().getProperty('KEYID') || GSUUID;
  const apikey = CRYPTOTOOLS_API_KEY ? CRYPTOTOOLS_API_KEY : KEYID;
  const additionalOptions = { headers: { apikey } };
  return await fetchData_({
    url: `https://${prefix}.charmantadvisory.com/${path}/${KEYID}`,
    params: { ...params },
    options: { ...options, ...additionalOptions }
  });
};
