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
    console.log('response code:', res.getResponseCode());
    if (res.getResponseCode() >= 200 && res.getResponseCode() < 300) {
      const content = res.getContentText();
      console.log('content:', content);
      return content && JSON.parse(content);
    } else if (retryStrategy && retryStrategy(res, attempt)) {
      console.log('retrying...total attempts:', attempt);
      retry = true;
      attempt++;
      Utilities.sleep(attempt * 1000);
    } else {
      console.log('throwing response...total attempts:', attempt);
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

function cachePut_(key, value) {
  CacheService.getScriptCache().put(key, value, EXPIRATION_IN_SECONDS);
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
    console.log('Failure getting path item from data. keyPath:', paramPath);
    return undefined;
  }
  return data;
}
