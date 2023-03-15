import { useState } from "react";

interface Props {
	children: string;
	maxChars?: number;
}

export const ExpandableText = ({ children, maxChars = 100 }: Props) => {
	const [isExpanded, setExpanded] = useState(false);

	if (maxChars >= children.length) return <p>{children}</p>;

	const text = isExpanded ? children : children.slice(0, maxChars);

	return (
		<>
			{text}...
			<button onClick={() => setExpanded(!isExpanded)}>
				{isExpanded ? "Less" : "More"}
			</button>
		</>
	);
};
