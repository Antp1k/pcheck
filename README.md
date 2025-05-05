# PCheck – v1.0.0
**PCheck** is a browser extension designed to aid in web security research. It helps identify parameters in a URL that behave differently, particularly those that reflect input more or less frequently than others. These uniquely-behaving parameters may indicate potential injection points or other unexpected behaviors.

The extension uses a special parameter called `defaultreflections`, which acts as a baseline for reflection comparison. Parameters that reflect significantly more or less than this baseline are flagged as unique. PCheck can be used in various ways to support dynamic testing workflows.

## How it works
- Enter a list of parameters into the text input area, then click the "Make URL" button. A URL will be generated using those parameters, either with canary values or a custom value you provide in the "Default Value" input field.
- When you press the "Check Params" button on a canary-filled URL (where no custom default value was provided), PCheck scans the URL and displays an alert showing any parameters that reflect more or less often than the baseline (`defaultreflections`).
- You can also experiment with the "Default Value" input by entering specific values like true, false, 1, etc., to observe how different values may alter application behavior.
- Alternatively, you can browse to any URL that already has parameters, and simply press "Check Params" to scan for reflection behavior directly.

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
