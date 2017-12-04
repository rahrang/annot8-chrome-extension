chrome.runtime.onInstalled.addListener(function() {
  // replace all rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // with a new rule
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // that fires when a page's URL contains "youtube.com"
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'youtube.com' }
          })
        ],
        // show the extension's page action
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  if (tab.url.includes('youtube.com/watch?')) {
    let paramsString = tab.url.split('youtube.com/watch?')[1];
    let paramsArr = paramsString.split('&');
    let params = {};
    for (let i = 0; i < paramsArr.length; ++i) {
      let p = paramsArr[i].split('=');
      let key = p[0];
      let val = p[1];
      params[key] = val;
    }
    let videoId = params['v'];
    chrome.tabs.create({
      url: `http://annot8.net/video/${videoId}`,
      active: true
    });
  }
});
