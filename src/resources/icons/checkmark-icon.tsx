import React from "react";

type CheckMarkIconType = {
	width?: string;
	height?: string;
	color?: string;
};

const CheckmarkIcon = ({
	width = "20",
	height = "20",
	color = "#000000",
}: CheckMarkIconType) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M0 11l2-2 5 5L18 3l2 2L7 18z" fill={color} />
	</svg>
);

export default CheckmarkIcon;
