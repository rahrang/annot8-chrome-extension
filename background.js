chrome.runtime.onInstalled.addListener(function() {
  // replace all rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // with a new rule
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // that fires when a page's URL contains "youtube.com"
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: "youtube.com" }
          })
        ],
        // show the extension's page action
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  if (tab.url.includes("youtube.com/watch?v=")) {
    let videoId = tab.url.split("watch?v=")[1];
    chrome.tabs.create({
      url: `http://annot8.net/video/${videoId}`,
      active: true
    });
  }
});
