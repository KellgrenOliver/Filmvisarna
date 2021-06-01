import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "../css/ProfilePage.module.css";
import { UserContext } from "../contexts/UserProvider";
import { BookingContext } from "../contexts/BookingProvider"

const ProfilePage = (props) => {
	const [editMode, setEditMode] = useState(false);
	const { whoami, user, updateUserInfo, message } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const history = useHistory();
	const { findBooking } = useContext(BookingContext);
	const booking = findBooking(props.match.params.bookingId);

	const onEdit = () => {
		setEditMode(true);
	};

	const updateHandler = () => {
		const userFromForm = {};
		userFromForm.email = email;
		userFromForm.oldPassword = password;
		userFromForm.newPassword = newPassword;
		userFromForm.phone = phoneNumber;

		setEditMode(false);
		updateUserInfo(userFromForm);
	};
	// to be able to edit the information in input
	useEffect(() => {
		if (user) {
			setPhoneNumber(user.phone);
			setEmail(user.email);
			setPassword(user.password);
			setNewPassword(user.newPassword);
		}
	}, [user]);

	useEffect(() => {
		whoami();
	}, []);

	

	if (!user) {
		return null; // redirect it to homePage
	} else {
		let emailContent;
		let passwordContent;
		let newPasswordContent;
		let phoneContent;
		let buttonContent;

		if (!editMode) {
			emailContent = (
				<span className={styles.infoDetail}>Email: {user.email}</span>
			);
			passwordContent = (
				<span className={styles.infoDetail}>Current password (required): {"*****"}</span>
			);

			phoneContent = (
				<span className={styles.infoDetail}>Phone number: {user.phone}</span>
			);
			buttonContent = (
				<button className={styles.mainBtn} onClick={onEdit}>
					Edit
				</button>
			);
		} else {
			emailContent = (
				<div>
					<label>Email address</label>
					<input
						type="text"
						id="emailinput"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>
			);
			passwordContent = (
				<div>
					<label>Current password</label>
					<input
						type="password"
						id="passwordinput"
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
			);
			newPasswordContent = (
				<div>
					<label>New password</label>
					<input
						type="password"
						id="newpasswordinput"
						value={newPassword}
						onChange={(event) => setNewPassword(event.target.value)}
					/>
				</div>
			);
			phoneContent = (
				<div>
					<label>Phone Number</label>
					<input
						type="text"
						id="numberinput"
						value={phoneNumber}
						onChange={(event) => setPhoneNumber(event.target.value)}
					/>
				</div>
			);
			buttonContent = (
				<button
					type="submit"
					className={styles.mainBtn}
					onClick={updateHandler}
				>
					Save changes
				</button>
			);
		}

		return (
			<div className={styles.container}>
				<h3>Welcome!</h3>
				<div className={styles.flex}>
					<div className={styles.info}>
						<div>
							<h6>Personal information</h6>
						</div>
						<hr></hr>
						<div>{emailContent}</div>
						<div>{passwordContent}</div>
						<div>{newPasswordContent}</div>
						<div>{phoneContent}</div>
						<div className={styles.flex}>{buttonContent}</div>
						<div>{message ? <p>{message}</p> : ""}</div>
					</div>
					<div className={styles.info}>
						<h6>Last bookings</h6>
						<hr />
						<div className={styles.flex}>
							<span>{user.bookings}</span>
							<button className={styles.btn}>Delete</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default ProfilePage;
