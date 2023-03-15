import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseTable } from "./components/ExpenseTable";
import { ExpenseFilter } from "./components/ExpenseFilter";


function App() {
	const [items, setItems] = useState({
		expenses: Array(),
		category: "All",
	});

	const handleSubmit = (data: FieldValues) => {
		setItems({
			...items,
			expenses: [...items.expenses, data],
		});
	};

	const handleDeleteItem = (flaggedIndex: number) => {
		setItems({
			...items,
			expenses: items.expenses.filter((item, index) => index !== flaggedIndex),
		});
	};

	const handleCategoryUpdate = (newCategory: string) => {
		setItems({
			category: newCategory,
			expenses: [...items.expenses],
		});
	};

	const expensesByCategory = () => {
		if (items.category === "All") return items.expenses;
		return items.expenses.filter((item) => {
			if (item.category === items.category) return item;
		});
	};

	return (
		<div>
			<ExpenseForm onSubmit={handleSubmit} />
			<ExpenseFilter onSelectCategory={handleCategoryUpdate} />
			<ExpenseTable
				onDelete={handleDeleteItem}
				expenses={expensesByCategory()}
			/>
		</div>
	);
}

export default App;
