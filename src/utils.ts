const TWEET_BLOCKER = "tweet-blocker";

export const getActiveTabURL = async (): Promise<chrome.tabs.Tab> => {
	const tabs: chrome.tabs.Tab[] = await chrome.tabs.query({
		currentWindow: true,
		active: true,
	});

	return tabs[0];
};

export const getChromeStorage = async (): Promise<Field[]> => {
	const fetchStorage = <T>(): Promise<Array<T>> => {
		return new Promise((resolve) => {
			chrome.storage.sync.get([TWEET_BLOCKER], (obj) => {
				resolve(obj[TWEET_BLOCKER] ? JSON.parse(obj[TWEET_BLOCKER]) : []);
			});
		});
	};
	return await fetchStorage();
};

export const setChromeStorage = (data: object[]): void => {
	chrome.storage.sync.set({
		[TWEET_BLOCKER]: JSON.stringify(data),
	});
};
