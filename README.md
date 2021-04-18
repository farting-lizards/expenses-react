1.  Setting up linting and formatting

        1.1 . Add dependencies for linting

    > yarn add --dev --exact eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin

        1.2 Add dependencies for formatting

    > yarn add --dev --exact eslint-config-prettier

        1.3 Add dependencies for automatic linting and formatting on pre-commits

    ```
     yarn add husky
     yarn add lint-staged
    ```

        1.4 Add following to package.json

    ```
      "lint-staged": {
        "src/**/*.{js,jsx,ts,tsx,json}": [
          "eslint . --fix",
          "git add"
        ],
        "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
          "prettier --write"
        ]
      },
    ```

        1.5 Configure the pre-commit hook:

    ```
    husky add .husky/pre-commit "yarn add lint-staged"
    ```

        1.6 To enable "format on save" in vscode, add the following in vscode's settings.json

    ```
      "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
    ```
