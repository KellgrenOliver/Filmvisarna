import { useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../contexts/UserProvider";

export default function AuthRoute({ children }) {
	const { loading, loggedIn } = useContext(UserContext);

	if (loading) return null;

	if (!loggedIn) {
		return <Redirect to={{ pathname: "/", state: { openModal: true } }} />;
	}

	return children;
}
