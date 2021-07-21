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
