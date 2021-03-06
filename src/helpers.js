function commonSleep_() {
  Utilities.sleep(Math.random() * 1000);
}

function retryOnStatusCodes_(...statusCodes) {
  return (response, attempt) => attempt <= 10 && statusCodes.includes(response.getResponseCode());
}

async function fetchData_(fetchOptions) {
  const {
    url,
    params,
    options,
    retryStrategy,
    advancedParseOptions,
    parseContent = true
  } = fetchOptions;
  const { query, parseOptions, includeFunc, transformFunc } = advancedParseOptions || {};
  const fetchUrlParamStr = params ? mapObjectToUrlParams_(params) : '';
  const fetchUrl = url + (fetchUrlParamStr ? '?' + fetchUrlParamStr : '');
  const urlFetchOptions = { muteHttpExceptions: true, ...options };

  console.log('fetchUrl:', fetchUrl);

  let retry = true;
  let attempt = 1;
  while (retry) {
    retry = false;
    const res = await UrlFetchApp.fetch(fetchUrl, urlFetchOptions);
    console.log('response code:', res.getResponseCode());
    if (res.getResponseCode() >= 200 && res.getResponseCode() < 300) {
      const content = res.getContentText();
      return !parseContent && !advancedParseOptions
        ? content
        : !advancedParseOptions
        ? content && JSON.parse(content)
        : parseJSONObject_(JSON.parse(content), query, parseOptions, includeFunc, transformFunc);
    } else if (retryStrategy && retryStrategy(res, attempt)) {
      console.log('retrying...total attempts:', attempt);
      retry = true;
      attempt++;
      Utilities.sleep(attempt * 1000);
    } else {
      console.log('throwing response...total attempts:', attempt);
      throw new Error(res);
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

function numberOrEmptyStr_(val) {
  return typeof val === 'number' ? val : '';
}

function tryParseNumber_(val) {
  return typeof val === 'number'
    ? val
    : typeof val === 'string' && val.trim() && isFinite(+val)
    ? +val
    : val;
}

function checkInput_(test, message) {
  if (!test) {
    throw message;
  }
}

function rotateGrid_(vals) {
  const rotated = new Array(vals[0].length).fill(0).map(() => new Array(vals.length));
  for (let i = 0; i < vals.length; ++i) {
    for (let j = 0; j < vals[i].length; ++j) {
      rotated[j][i] = vals[i][j];
    }
  }
  return rotated;
}

function isCellOrRowOrCol_(val) {
  return isCell_(val) || isRow_(val) || isCol_(val);
}

function isCell_(val) {
  return !Array.isArray(val);
}

function isRow_(val) {
  return !isCell_(val) && val.length === 1;
}

function isCol_(val) {
  return !isCell_(val) && val[0].length === 1;
}

function flattenGridOrCell_(gridOrCell) {
  return !Array.isArray(gridOrCell)
    ? [(gridOrCell + '').trim()]
    : gridOrCell.length === 1
    ? gridOrCell[0].map((v) => (v + '').trim())
    : gridOrCell.map((vArr) => (vArr[0] + '').trim());
}
