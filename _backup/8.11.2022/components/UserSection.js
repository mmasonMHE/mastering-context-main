import { useUser } from "../context/store-context-selector";
const UserSection = () => {
	const user = useUser();
	return <div>User: {user}</div>;
};

export default UserSection;
