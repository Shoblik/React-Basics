import { useEffect, useState } from "react";
import axios from "axios";

interface User {
	id: number;
	name: string;
}

export const App = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((res) => {
				setUsers(res.data);
				setError('')
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);

	return (
		<>
			{error && <p className='text-danger'>{error}</p>}

			<ul>
				{users.map((user, index) => (
					<li key={index}>{user.name}</li>
				))}
			</ul>
		</>
	);
};

export default App;
