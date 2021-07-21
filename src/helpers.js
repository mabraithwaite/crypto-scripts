function commonSleep_() {
  Utilities.sleep(Math.random() * 1000);
}

function retryOnStatusCodes_(...statusCodes) {
  return (response, attempt) => attempt <= 10 && statusCodes.includes(response.getResponseCode());
}

async function fetchData_(fetchOptions) {
  const { url, params, options, retryStrategy } = fetchOptions;
  const fetchUrlParamStr = params ? mapObjectToUrlParams_(params) : '';
  const fetchUrl = url + (fetchUrlParamStr ? '?' + fetchUrlParamStr : '');
  const urlFetchOptions = { muteHttpExceptions: true, ...options };

  let retry = true;
  let attempt = 1;
  while (retry) {
    retry = false;
    const res = await UrlFetchApp.fetch(fetchUrl, urlFetchOptions);
    Logger.log('response code: ' + res.getResponseCode());
    if (res.getResponseCode() >= 200 && res.getResponseCode() < 300) {
      const content = res.getContentText();
      return content && JSON.parse(content);
    } else if (retryStrategy && retryStrategy(res, attempt)) {
      Logger.log('retrying...total attempts: ' + attempt);
      retry = true;
      attempt++;
      Utilities.sleep(attempt * 1000);
    } else {
      Logger.log('throwing response...total attempts: ' + attempt);
      throw res;
    }
  }
}

function getStringHash_(str) {
  return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, str));
}

function cacheGet_(cacheId) {
  return CacheService.getScriptCache().get(cacheId);
}

function cachePut_(key, value, expInSec) {
  if (expInSec != null) {
    CacheService.getScriptCache().put(key, value, expInSec);
  } else {
    CacheService.getScriptCache().put(key, value);
  }
}

function mapObjectToUrlParams_(obj) {
  let str = '';
  for (const key in obj) {
    const val = typeof obj[key] === 'string' ? obj[key] : obj[key].join(',');
    str += `${str && '&'}${key}=${val}`;
  }
  return str;
}

function mapParmKeyToParamPath_(paramKey) {
  return (paramKey || '').split(/[.\/]/).filter((v) => v);
}

function getDataPathItem_(data, paramPath) {
  try {
    for (const param of paramPath) {
      data = data[param];
    }
  } catch (e) {
    Logger.log('Failure getting path item from data. keyPath: ' + JSON.stringify(paramPath));
    return undefined;
  }
  return data;
}
