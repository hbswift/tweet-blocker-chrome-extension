import { getChromeStorage, setChromeStorage } from "./utils";

(() => {
	let data: Field[] = [];

	const filterTweets = async (): Promise<void> => {
		let twitter_feed = document.querySelector(
			'section[aria-labelledby^="accessible-list-"]'
		);
		while (twitter_feed === null) {
			await new Promise((r) => setTimeout(r, 100));
			twitter_feed = document.querySelector(
				'section[aria-labelledby^="accessible-list-"]'
			);
		}
		data = await getChromeStorage();
		const tweets = document.querySelectorAll<HTMLElement>(
			'article[data-testid="tweet"]'
		);
		[...tweets].map((tweet: HTMLElement) => {
			if (
				data.some((record) =>
					tweet?.innerHTML.toLowerCase().includes(record.value.toLowerCase())
				)
			) {
				(<HTMLElement>tweet?.parentNode).style.display = "none";
			} else if (
				data.some((record) =>
					tweet?.outerHTML.toLowerCase().includes(record.value.toLowerCase())
				)
			) {
				(<HTMLElement>tweet?.parentNode).style.display = "none";
			} else {
				(<HTMLElement>tweet?.parentNode).style.display = "inline";
			}
		});
	};

	const updateStorage = async (text: string): Promise<void> => {
		const oldData = await getChromeStorage();
		setChromeStorage([...oldData, { value: text }]);
		filterTweets();
	};

	if (window)
		window.onscroll = () => {
			filterTweets();
		};

	chrome.runtime.onMessage.addListener(function (message): void {
		const { isTwitter, selectedText } = message;
		if (isTwitter) filterTweets();
		if (selectedText) updateStorage(selectedText);
	});
})();
