import React from "react";

interface Expense {
	category: string;
	description: string;
	amount: number;
}

interface Props {
	onDelete: (index: number) => void;
	expenses: Expense[]
}

export const ExpenseTable = ({ onDelete, expenses }: Props) => {

	if (!expenses.length) return <p className='text-danger'>No expenses found...</p>;

	return (
		<table className="table table-bordered table-dark">
			<thead>
				<tr>
					<th>Description</th>
					<th>Amount</th>
					<th>Category</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{expenses.map((item, index) => {
					return (
						<tr key={index}>
							<td>{item.description}</td>
							<td>${item.amount}</td>
							<td>{item.category}</td>
							<td>
								<button
									onClick={() => onDelete(index)}
									className="btn btn-danger"
								>
									Delete
								</button>
							</td>
						</tr>
					);
				})}
				<tr>
					<td>Total</td>
					<td>${expenses.reduce((acc, expense) => expense.amount + acc, 0).toFixed(2)}</td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
	);
};
