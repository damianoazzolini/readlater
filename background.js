chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: '.' },
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});