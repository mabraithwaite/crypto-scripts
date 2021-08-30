## Overview

Started as a rewrite of these projects with a few of my own optimizations and extra functionality:
- https://github.com/Eloise1988/COINGECKO
- https://github.com/Eloise1988/CRYPTOBALANCE

Opted to use CoinMarketCap over CoinGecko because you can get a free api key from CoinMarketCap for more responsive api calls.

Main benefits here are:
- More efficient api calls
    - Retry uses a back-off pattern to avoid spamming the different api
    - Can batch together data extractions to better utilize a single api call
- More consistent function returns (similar functions act the same/more similar)
- Easier to read/write
    - Abstract a lot of the logic into helper functions
    - Formatted (using [prettier](https://www.npmjs.com/package/prettier))
    - Can use [ESLint](https://www.npmjs.com/package/eslint) plugins in your favorite IDE
- Uses [@google/clasp](https://www.npmjs.com/package/@google/clasp) so you can edit locally then deploy all scripts to your sheets
- Added helpful npm scripts for those not familiar with prettier or clasp
- Very easy to set up
- All scripts are in a single workspace and deployed at once
- Uses CoinMarketCap for more responsive calls and less throttling

## Instructions
1. Install node packages
    ```bash
    $ npm i
    ```
1. Get a free api key from CoinMarketCap here: https://coinmarketcap.com/api/
1. Add the api key to `data/constants.js`
1. One of two options:
    - If you want to create a google spreadsheet with these scripts, run:
        ```bash
        $ npm run clasp-create-spreadsheet 
        ```
    - If you want to push these scripts to an existing google spreadsheet, first [get the script id](https://stackoverflow.com/a/36001790) of your current sheets script and run:
        ```bash
        $ npm run clasp-set-new-script-id <your-script-id>
        $ npm run clasp-push
        ```
Each time you make a change locally, make sure to push the changes with:
```
$ npm run clasp-push
```

**NOTE:** Using `clasp push` writes over all of your current scripts with the ones in this project/workspace.

## Example

Crypto Portfolio Template: https://docs.google.com/spreadsheets/d/1FUcBl3vGjXG1h4zgcsU3kg2NnRZJmZKN8-unauMwSNU/edit?usp=sharing
- Template is calling a sandbox api so returns unrealistic data. You'll need to push the scripts with your new api key for it to work.
- I've locked all the tabs so people can't edit it. To play around with the template you can click "File" -> "Make a Copy"