chrome.runtime.onInstalled.addListener((): void => {
	chrome.contextMenus.create({
		title: "Tweet Blocker - Block highlighted text",
		contexts: ["selection"],
		id: "tweetBlockerContextMenuId",
		documentUrlPatterns: ["https://*.twitter.com/*"],
	});
});

chrome.contextMenus.onClicked.addListener((info, tab): void => {
	chrome.tabs.sendMessage(tab?.id as number, {
		selectedText: info.selectionText,
	});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab): void => {
	if (tab.url && tab.url.includes("twitter.com/")) {
		chrome.tabs.sendMessage(tabId, {
			isTwitter: true,
		});
	}
	if (changeInfo?.title?.toLowerCase()?.includes("twitter")) {
		chrome.tabs.sendMessage(tabId, {
			isTwitter: true,
		});
	}
});

chrome.tabs.onCreated.addListener((tab): void => {
	if (tab.url && tab.url.includes("twitter.com/")) {
		chrome.tabs.sendMessage(tab?.id as number, {
			isTwitter: true,
		});
	}
});

chrome.runtime.onStartup.addListener((): void => {
	chrome.tabs.onCreated.addListener((tab): void => {
		if (tab.url && tab.url.includes("twitter.com/")) {
			chrome.tabs.sendMessage(tab?.id as number, {
				isTwitter: true,
			});
		}
	});
});
