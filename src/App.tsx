import { useEffect, useRef, useState } from "react";
import { ProductList } from './components/ProductList';

function App() {
	const [category, setCategory] = useState('');

	const ref = useRef<HTMLInputElement>(null);

	return (
		<>
			<select onChange={(event) => setCategory(event.target.value)} className="form-select">
				<option value=""></option>
				<option value="Clothing">Clothing</option>
				<option value="Household">Household</option>
			</select>
			<ProductList category={category} />
		</>
	)
}

export default App;