let parameters = []; // Filled with parameters passed through the textarea 

// Generates an url for the current tab with all the parameters
// passed to the textarea in the popup window
document.getElementById('makeUrl').addEventListener('click', async function() {
  // Make an array of parameters
  const paramString = document.getElementById('parameters').value;
  parameters = paramString.split('\n').map(line => line.trim()).filter(line => line);
  parameters.push('defaultreflections'); // Parameter used to check default reflections

  // Get current tab url
  const tabs = await browser.tabs.query({active: true, currentWindow: true});
  const currentTab = tabs[0].url;

  // Create a string of parameters with canary strings
  // used to check if a parameter reflects
  let queryParams = '';
  if (document.getElementById('paramValue').value === '') {
    for (let i = 0; i < parameters.length; i++) {
      if (i === 0 && !currentTab.includes("?")) {
        queryParams += "?" + parameters[i] + "=" + generateCanaryString();
      } else {
        queryParams += "&" + parameters[i] + "=" + generateCanaryString();
      }
    }
  } else {
    for (let i = 0; i < parameters.length; i++) {
      if (i === 0 && !currentTab.includes("?")) {
        queryParams += "?" + parameters[i] + "=" + document.getElementById('paramValue').value;
      } else {
        queryParams += "&" + parameters[i] + "=" + document.getElementById('paramValue').value;
      }
    }
  }

  // Add final url to the popup window
  document.getElementById('fullUrl').textContent = currentTab + queryParams;
});

// Checks which parameters reflect more to determine if a parameter has unique
// functionality in the page
document.getElementById('reflections').addEventListener('click', async function() {
  // Get the current tab url, split the parameters and the base url
  const tabs = await browser.tabs.query({active: true, currentWindow: true});
  const currentUrl = new URL(tabs[0].url);
  const currentUrlStr = tabs[0].url;

  // Make an object from the parameters
  const params = Object.fromEntries(currentUrl.searchParams.entries());

  // Get the HTML of the current tab
  browser.tabs.sendMessage(tabs[0].id, {action:"html"}, (response) => {
    const html = response.toString();
    
    // Start counting canary values to determine unique param behaviour
    let alertPopup = 'Parameters and their reflect count:\n';
    if (currentUrlStr.includes("defaultreflections")) {
      for (let [key, value] of Object.entries(params)) {
        const canaryCount = countCanaries(html, value);
        if (key === "defaultreflections") {
          alertPopup += "\nNon-unique parameters reflected " + canaryCount.toString() + ' times.\n';
        } else {
          if (canaryCount !== countCanaries(html, params["defaultreflections"])) {
            alertPopup += key + ': ' + canaryCount.toString() + '\n';
          }
        }
      }
    } else {
      for (let [key, value] of Object.entries(params)) {
        alertPopup += key + ': ' + countCanaries(html, value).toString() + '\n';
      }
    }
    browser.tabs.sendMessage(tabs[0].id, {action:"alert", str:alertPopup}, (response) => {
      // Do nothing
    });
  });
});

// Function used to generate canary strings for parameters
function generateCanaryString(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let canary = '';
  for (let i = 0; i < length; i++) {
    canary += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return canary;
}

// Function used to get matches for parameter canary strings
function countCanaries(html, canary) {
  const matches = html.match(new RegExp(canary, 'g'));
  return matches ? matches.length : 0;
}
