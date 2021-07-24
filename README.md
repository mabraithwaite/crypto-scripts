## Overview

Basically a rewrite of this project https://github.com/Eloise1988/COINGECKO with a few of my own optimizations and extra functionality. Main benefits here are:
- More efficient api calls
    - Retry uses a back-off pattern to avoid spamming CoinGecko's api
    - Can block together data extractions to better utilize a single api call
- More consistent function returns (similar functions act the same/more similar)
- Easier to read/write
    - Abstract a lot of the logic into helper functions
    - Formatted (using [prettier](https://www.npmjs.com/package/prettier))
    - Can use [ESLint](https://www.npmjs.com/package/eslint) plugins in your favorite IDE
- Uses [@google/clasp](https://www.npmjs.com/package/@google/clasp) so you can edit locally then deploy all scripts to your sheets
- Added helpful npm scripts for those not familiar with prettier or clasp
- Very easy to set up
- All scripts are in a single workspace and deployed at once

## Instructions
1. Install node packages
    ```bash
    $ npm i
    ```
2. One of two options:
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
