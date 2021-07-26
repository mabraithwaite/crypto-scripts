const SUPPORT_EMAIL = 'ac@charmantadvisory.com';
const TELEGRAM_URL = 'https://t.me/TheCryptoCurious';
const GITHUB_URL = 'https://github.com/Eloise1988';
const API_DOCS_URL = 'https://app.swaggerhub.com/apis-docs/Eloise1988/Crypto-Tools';

function ShowHowToRefresh() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Get your wallet Balances',
    ' Returns cryptocurrencies balances for over 1000+ cryptocurrencies. \n \n @param {"CURRENCY TICKER"} The cryptocurrency TICKER/SYMBOL data to fetch, for example the symbol of Bitcoin is BTC. \n @param {"PUBLIC WALLET ADDRESS"} associated to the cryptocurrency you want the balance from. Please pay attention, DO NOT TO ENTER your private wallet address.\n @param {"EMPTY CELL REFERENCE"} refresh_cell ONLY on 3rd argument. Reference an empty cell and change its content to force refresh the balances. \n @return The current amount of cryptocurrency on the searched public address. \n \n In your CRYPTOBALANCE function, add a 3rd argument to a locked reference cell, like A1. \nFrom now on every time you change the content of the cell A1, your data will be updated.\n \nGet the amount of BTC on the following wallet: \n Example:\n=CRYPTBALANCE("BTC","35hK24tcLEWcgNA4JxpvbkNkoAcDGqQPsP",$A$1)',
    ui.ButtonSet.OK
  );
}

function ShowHowCRYPTOSTAKING() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Get staking amounts',
    'Returns the amount STAKED on PoS cryptocurrencies.\n \n@param {"CURRENCY TICKER FOR STAKING"} The cryptocurrency TICKER/SYMBOL data to fetch.\n@param {"PUBLIC WALLET ADDRESS"} associated to the cryptocurrency you want the balance from. Please pay attention, DO NOT TO ENTER your private wallet address.\n@param {"EMPTY CELL REFERENCE"} refresh_cell ONLY on 3rd argument. Reference an empty cell and change its content to force refresh the balances.\n@return The current amount of cryptocurrency on the searched public address.\n \n Get the EOS staked on the oktothemoon address address \n=CRYPTOSTAKING("EOS","okbtothemoon")',
    ui.ButtonSet.OK
  );
}

function ShowHowCRYPTOREWARDS() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Get the amount of rewards received from staking',
    'Returns cryptocurrencies REWARDS on PoS cryptocurrencies.\n \n @param {"CURRENCY TICKER FOR REWARDS"} The cryptocurrency TICKER/SYMBOL data to fetch.\n @param {"PUBLIC WALLET ADDRESS"} associated to the cryptocurrency you want the rewards from. Please pay attention, DO NOT TO ENTER your private wallet address.\n@param {"EMPTY CELL REFERENCE"} refresh_cell ONLY on 3rd argument. Reference an empty cell and change its content to force refresh the balances.\n @return The current amount of cryptocurrency on the searched public address.\n \n Get the ATOM rewards for staking on the following address \n=CRYPTOREWARDS("ATOM","cosmos1r0y7s2vrgk3nw3nkp5tyy8zxjkz7nw9vrvmxun")',
    ui.ButtonSet.OK
  );
}

function ShowHowCRYPTOLENDING() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Get cryptocurrency lending rates on decentralized and semi-centralized exchanges',
    'Returns cryptocurrencies lending rates on different lending plateforms.\n \n @param {"EXCHANGE"} The exchange on which you want to retrieve the lending rate. data to fetch. Examples of exchanges: NUO, COMPOUND, DXDY, FULCRUM, AAVE .... \n @param {"TOKEN NAME"} associated to the cryptocurrency you want the lending from. Please pay attention on the available tickers on exchanges. \n @param {"APR_BORROW or APR_LEND"} either APR_BORROW which corresponds to the borrowing rate or APR_LEND which corresponds to the lending rate. \n @param {"EMPTY CELL REFERENCE"} refresh_cell ONLY on 3rd argument. Reference an empty cell and change its content to force refresh the balances. \n @return the current lending rate in decimal form,  of cryptocurrency on the searched public address.\n \n Get the borrowing rate on compound for Ethereum. \n =CRYPTOLENDING("COMPOUND","ETH","APR_BORROW")',
    ui.ButtonSet.OK
  );
}

function ShowPremium() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Premium users',
    `For users needing faster, higher limits and customization: a private server is available but only accessible through api-key identification\n
               Support email: ${SUPPORT_EMAIL}\n
               Telegram Chat: ${TELEGRAM_URL}`,
    ui.ButtonSet.OK
  );
}

function ShowContactInfo() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Contact Info',
    `Support email: ac@charmantadvisory.com\n
               Telegram Chat: ${TELEGRAM_URL}\n
               Github: ${GITHUB_URL}\n
               API Doc: ${API_DOCS_URL}`,
    ui.ButtonSet.OK
  );
}
