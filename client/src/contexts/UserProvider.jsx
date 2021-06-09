import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		whoami();
	}, []);

	const whoami = async () => {
		let user = await fetch("/api/v1/users/whoami");
		user = await user.json(user);
		setUser(user);
	};

	const addBooking = (booking) => {
		setUser((user) => ({ ...user, bookings: [...user.bookings, booking] }));
	};

	const login = async (userToLogin) => {
		let result = await fetch("/api/v1/users/login", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(userToLogin),
		});
		result = await result.json(userToLogin);
		setUser(result.loggedInUser);
		return result;
	};

	const logout = async () => {
		let result = await fetch("/api/v1/users/logout");
		result = await result.json(result);
		setUser(null);
		return result;
	};

	const createUser = async (userToCreate) => {
		let result = await fetch("/api/v1/users/", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(userToCreate),
		});
		result = await result.json(userToCreate);
		setUser(userToCreate);
		return result;
	};

	// to save the changes which are coming from profile page

	const updateUserInfo = async (userToUpdate) => {
		let result = await fetch(`api/v1/users/${user._id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(userToUpdate),
		});

		if (result.status === 401) {
			setMessage("Bad Credentials");
			return false;
		} else if (result.status === 200) {
			// to get the updated info from backend
			result = await result.json(userToUpdate);
			setMessage(result.success);
			const updatedUser = result.obj;
			setUser(updatedUser);
			return updatedUser;
		} else {
			setMessage("Something went wrong!");
			return false;
		}
	};

	const deleteBooking = async (id) => {
		let response = await fetch(`/api/v1/bookings/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
			},
		});

		if (response.status === 200) {
			const updatedBookings = user.bookings.filter((b) => b._id !== id);
			setUser({ ...user, bookings: updatedBookings });
		}
	};

	const values = {
		login,
		createUser,
		whoami,
		user,
		setUser,
		logout,
		updateUserInfo,
		message,
		setMessage,
		addBooking,
		loggedIn: Boolean(user),
		deleteBooking,
	};

	return (
		<UserContext.Provider value={values}>{props.children}</UserContext.Provider>
	);
};

export default UserProvider;
