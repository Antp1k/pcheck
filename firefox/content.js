browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "html") {
    const html = document.documentElement.outerHTML;
    setTimeout(() =>{
      sendResponse(html);
    }, 200);
  } 
  if (message.action === "alert") {
    alert(message.str);
  }
  return true;
});
