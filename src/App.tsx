import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";

interface User {
	id: number;
	name: string;
}

export const App = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController();

		setLoading(true);
		axios
			.get("https://jsonplaceholder.typicode.com/users", {
				signal: controller.signal,
			})
			.then((res) => {
				setUsers(res.data);
				setError("");
				setLoading(false);
			})
			.catch((error) => {
				if (error instanceof CanceledError) return;
				setError(error.message);
				setLoading(false);
			})

		return () => controller.abort();
	}, []);

	return (
		<>
			{error && <p className="text-danger">{error}</p>}
			{isLoading && <div className="spinner-border"></div>}
			<ul>
				{users.map((user, index) => (
					<li key={index}>{user.name}</li>
				))}
			</ul>
		</>
	);
};

export default App;
