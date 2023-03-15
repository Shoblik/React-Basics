interface Props {
	cartItemsCount: number;
}

export const Navbar = ({ cartItemsCount }: Props) => {
	return <>NavBar: {cartItemsCount}</>;
};
