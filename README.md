# v1.0.0
**PCheck** is a browser extension to help with security research. It's used to check if a list of parameters has parameters that show unique behaviour by reflecting more or less than other parameters. There is one extra parameter called "defaultreflections" when making an URL through the extension, which will be used to see if other params reflect as many times as this parameter does, if they don't then they're added as a unique parameter. There are other ways to use the extension to help with the flow of testing parameters.

## How it works
- By placing a list of parameters into the text area input and pressing "make URL" button, a URL with the list of parameters is created with either canary values or a unique input value.
- When you have a URL that's full of parameters with canary values (when you don't place a unique input into the default value input) and press "check params" button, you will be given an alert popup, which will tell you if you had any unique parameters that had more or less reflections than other parameters.
- You could also test parameters if any of them would do something by using the default value input, by placing values such as true, false, 1 etc. to see if the applications behaviour changes.
- You can also browse to any URL that has parameters and press "check params" to see if any of those parameters are reflecting.

## Installation
#### Chrome:
1. Use `git clone https://github.com/Antp1k/pcheck.git` in your shell
2. Open `chrome://extensions` in your browser
3. Enable developer mode
4. Press load unpacked
5. Navigate to the pcheck/chrome directory and select manifest.json

#### Firefox:
- The extension will be available in the firefox store at a later date, for now the following instructions will do, however the extension has to be reloaded each time you open firefox.
1. Use `git clone https://github.com/Antp1k/pcheck.git` in your shell
2. Open `about:debugging#/runtime/this-firefox` in your browser
3. Press `Load Temporary Add-on`
4. Navigate to the pcheck/firefox directory and select manifest.json
