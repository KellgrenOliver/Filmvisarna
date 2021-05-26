import React, { useState, useContext, history, useEffect } from "react";
import styles from "../css/ProfilePage.module.css";
import { UserContext } from "../contexts/UserProvider";

const ProfilePage = () => {
	const [editMode, setEditMode] = useState(false);
	const { whoami, user } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const onEdit = () => {
		setEditMode(true);
	};

	const updateHandler = () => {
		setEditMode(false);
	};
	// to be able to edit the phone number in input
	useEffect(() => {
		console.log(user);
		if (user) {setPhoneNumber(user.phone);
		setEmail(user.email);
		setPassword(user.password);}
	}, [user]);

	useEffect(() => {
		whoami();
	}, []);

	if (!user) {
		return null;
	} else {
		let emailContent;
		let passwordContent;
		let phoneContent;
		let buttonContent;

		if (!editMode) {
			emailContent = (
				<span className={styles.infoDetail}>Email: {user.email}</span>
			);
			passwordContent = (
				<span className={styles.infoDetail}>Password: {user.password}</span>
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
					<label >Password</label>
					<input
						type="text"
						id="passwordinput"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
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
				<button className={styles.mainBtn} onClick={updateHandler}>
					Update changes
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
						<div>
							{phoneContent}
							<div className={styles.flex}>{buttonContent}</div>
						</div>
					</div>
					<div className={styles.info}>
						<h6>Last bookings</h6>
						<hr />
						<div className={styles.flex}>
							<span>Bookings show here</span>
							<button className={styles.btn}>Delete</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default ProfilePage;
