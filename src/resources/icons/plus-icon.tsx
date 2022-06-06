import React from "react";

type PlusIconType = {
	width?: string;
	height?: string;
	color?: string;
};

const PlusIcon = ({
	width = "24",
	height = "24",
	color = "#1da1f2",
}: PlusIconType) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M15,2.5H9A6.513,6.513,0,0,0,2.5,9v6A6.513,6.513,0,0,0,9,21.5h6A6.513,6.513,0,0,0,21.5,15V9A6.513,6.513,0,0,0,15,2.5ZM16,13H13v3a1,1,0,0,1-2,0V13H8a1,1,0,0,1,0-2h3V8a1,1,0,0,1,2,0v3h3a1,1,0,0,1,0,2Z"
			fill={color}
		/>
	</svg>
);

export default PlusIcon;
