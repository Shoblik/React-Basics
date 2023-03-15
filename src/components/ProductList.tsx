import React, { useState, useEffect } from "react";

export const ProductList = ({ category }: { category:string}) => {
	const [products, setProducts] = useState<string[]>([]);

	useEffect(() => {
		console.log("fetching products in " + category);
        setProducts(['Clothing', 'Household']);
	}, [category]);

	return <div>ProductList</div>;
};
