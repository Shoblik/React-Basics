import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "./categories";

const schema = z.object({
	description: z
		.string()
		.min(3, { message: "Description must be at least 3 characters." }),
	amount: z
		.number({ invalid_type_error: "Number field is required." })
		.min(1, { message: "Amount must be greater than 1" }),
	category: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Props {
	onSubmit: (data: FieldValues) => void;
}

export const ExpenseForm = ({ onSubmit }: Props) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	return (
		<>
			<form
				onSubmit={handleSubmit((data) => {
					onSubmit(data);
					reset();
				})}
			>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input
						{...register("description")}
						id="Description"
						type="text"
						className="form-control"
					/>

					{errors.description && (
						<p className="text-danger">{errors.description.message}</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="amount" className="form-label">
						Amount
					</label>
					<input
						{...register("amount", { valueAsNumber: true })}
						id="amount"
						type="number"
						className="form-control"
					/>
					{errors.amount && (
						<p className="text-danger">{errors.amount.message}</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="category" className="form-label">
						Category
					</label>
					<select
						{...register("category")}
						name="category"
						id="category"
						className="form-control"
					>
						{categories.map((c) => (
							<option key={c}>{c}</option>
						))}
					</select>
					{errors.category && (
						<p className="text-danger">{errors.category.message}</p>
					)}
				</div>
				<button disabled={!isValid} className="btn btn-primary" type="submit">
					Submit
				</button>
			</form>
			<br />
		</>
	);
};
