import React from "react";
import { categories } from "./categories";

interface Props {
	onSelectCategory: (newCat: string) => void;
}

export const ExpenseFilter = ({ onSelectCategory }: Props) => {
	return (
		<form onSubmit={(event) => event.preventDefault()}>
			<div className="mb-3">
				<select
					onChange={(event) => onSelectCategory(event.target.value)}
					defaultValue={"All"}
					className="form-control"
				>
					<option value="All">All Categories</option>
					{categories.map((c) => (
						<option key={c}>{c}</option>
					))}
				</select>
			</div>
		</form>
	);
};
