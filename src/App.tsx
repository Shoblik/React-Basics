import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { CanceledError } from './services/api-client';
import userService, { User } from './services/user-service';

export const App = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState('');
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const { request, cancel } = userService.getAll<User>();
		request
			.then((res) => {
				setUsers(res.data);
				setError('');
				setLoading(false);
			})
			.catch((error) => {
				if (error instanceof CanceledError) return;
				setError(error.message);
				setLoading(false);
			});

		return () => cancel();
	}, []);

	const deleteUser = (user: User) => {
		const originalUsers = [...users];

		setUsers(users.filter((currentUser) => currentUser.id != user.id));

		const { request } = userService.delete(user.id);

		request.catch((error) => {
			setError(error.message);
			setUsers(originalUsers);
		});
	};

	const addUser = () => {
		const originalUsers = [...users];
		const newUser = {
			id: 0,
			name: 'Simon',
		};

		setUsers([newUser, ...users]);

		userService
			.create(newUser)
			.then(({ data: savedUser }) => setUsers([savedUser, ...users]))
			.catch((err) => {
				setError(err.message);
				setUsers(originalUsers);
			});
	};

	const updateUser = (user: User) => {
		const originalUsers = [...users];
		const updatedUser = { ...user, name: user.name + '!' };

		setUsers(
			users.map((currentUser) =>
				currentUser.id === user.id ? updatedUser : currentUser
			)
		);

		userService.update(updatedUser).catch((err) => {
			setError(err.message);
		});
	};

	return (
		<>
			{error && <p className='text-danger'>{error}</p>}
			{isLoading && <div className='spinner-border'></div>}
			<button onClick={addUser} className='btn btn-primary bm-3'>
				Add
			</button>

			<ul className='list-group'>
				{users.map((user, index) => (
					<li
						className='list-group-item d-flex justify-content-between'
						key={index}
					>
						{user.name}
						<div>
							<button
								className='btn btn-outline-danger'
								onClick={() => deleteUser(user)}
							>
								Delete
							</button>
							<button
								className='btn btn-outline-warning mx-1'
								onClick={() => updateUser(user)}
							>
								Update
							</button>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default App;
