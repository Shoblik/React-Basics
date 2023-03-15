import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface User {
	id: number;
	name: string;
}

export const App = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await axios.get<User[]>(
					"https://jsonplaceholder.typicode.com/users"
				);
				setUsers(res.data);
			}
			catch(error) {
				setError((error as AxiosError).message);
			}
		};
		
		fetchUsers();

	}, []);

	return (
		<>
			{error && <p className="text-danger">{error}</p>}

			<ul>
				{users.map((user, index) => (
					<li key={index}>{user.name}</li>
				))}
			</ul>
		</>
	);
};

export default App;
