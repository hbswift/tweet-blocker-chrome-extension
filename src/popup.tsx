import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import CheckmarkIcon from "./resources/icons/checkmark-icon";
import PlusIcon from "./resources/icons/plus-icon";
import RemoveIcon from "./resources/icons/remove-icon";
import { getActiveTabURL, getChromeStorage, setChromeStorage } from "./utils";

export const Popup = (): JSX.Element => {
	const [fields, setFields] = useState<Field[]>([]);
	const [showInput, setShowInput] = useState<boolean>(false);
	const [text, setText] = useState<string>("");

	document.addEventListener("DOMContentLoaded", async (): Promise<void> => {
		const data: Field[] = await getChromeStorage();
		setFields(data);
	});

	useEffect((): void => {
		const updateTab = async () => {
			const activeTab: chrome.tabs.Tab = await getActiveTabURL();
			if (activeTab?.url?.includes("twitter.com/")) {
				chrome.tabs.sendMessage(activeTab?.id as number, {
					isTwitter: true,
				});
			}
		};
		updateTab();
	}, [fields]);

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setText(event.target.value);
	};

	const addField = (): void => {
		if (text.length === 0) return;
		const newFields = [...fields, { value: text }];
		setChromeStorage(newFields);
		setFields(newFields);
		setShowInput(false);
		setText("");
	};

	const removeField = (index: number): void => {
		let newFields = [...fields];
		newFields.splice(index, 1);
		setChromeStorage(newFields);
		setFields(newFields);
	};

	return (
		<div className="wrapper">
			<div className="header" />
			<div className="description">
				<div>Enter text below to block out tweets that contain a match.</div>
				<div>
					An additional method is to highlight text and right-click to block.
				</div>
			</div>
			<hr className="divider" />
			<div>
				{fields.length > 0 &&
					fields.map((field, index) => {
						return (
							<div key={`field-${index}`} className="field-wrapper">
								<div className="field-value">{field.value}</div>
								<div
									onClick={() => removeField(index)}
									className="pointer remove-field-icon"
								>
									<RemoveIcon />
								</div>
							</div>
						);
					})}
			</div>
			{showInput && (
				<div className="input-wrapper">
					<div>
						<input
							autoFocus={true}
							onChange={onInputChange}
							type="text"
							value={text}
							onKeyDown={(e) => e.key === "Enter" && addField()}
							className="field-input"
						/>
					</div>
					<div className="input-icons">
						<div onClick={addField} className="pointer checkmark-margin">
							<CheckmarkIcon />
						</div>
						<div
							onClick={() => {
								setShowInput(false);
								setText("");
							}}
							className="pointer"
						>
							<RemoveIcon />
						</div>
					</div>
				</div>
			)}
			<div
				className="button-container pointer"
				onClick={() => setShowInput(true)}
			>
				<PlusIcon />
			</div>
		</div>
	);
};
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
);
