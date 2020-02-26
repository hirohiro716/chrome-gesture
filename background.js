chrome.runtime.onMessage.addListener(function(message) {
    switch (message) {
    case 'newtab':
        chrome.tabs.create({url: 'chrome://newtab'});
        break;
    case 'closetab':
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
            chrome.tabs.remove(tabs[0].id);
        });
        break;
    }
});
