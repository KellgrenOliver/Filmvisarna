import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "../css/ProfilePage.module.css";
import { UserContext } from "../contexts/UserProvider";
import dayjs from "dayjs";

const ProfilePage = () => {
	const [editMode, setEditMode] = useState(false);
	const { whoami, user, updateUserInfo, message, setMessage } =
		useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const history = useHistory();

	const getSeatValueWeight = (seatType) => {
		switch (seatType.toLowerCase()) {
			case "senior":
				return 0.8;
			case "child":
				return 0.7;
			default:
				return 1;
		}
	}


	const onEdit = () => {
		setMessage(null);
		setEditMode(true);
	};

	const onEditCancelled = () => {
		setMessage(null);
		setEditMode(false);
	};

	const updateHandler = async () => {
		if (!password) {
			setMessage("Please enter your current password.");
			setPassword(null);
			return;
		}

		const userFromForm = {};
		userFromForm.email = email;
		userFromForm.oldPassword = password;
		userFromForm.newPassword = newPassword;
		userFromForm.phone = phoneNumber;

		const result = await updateUserInfo(userFromForm);

		if (result) {
			setEditMode(false);
		}
	};

	const deleteHandler = () => {
		console.log(user);
	}
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
		setMessage(null);
		whoami();
	}, []);

	if (!user) {
		return null; // redirect it to homePage
	} else {
		// console.log(user);
		let emailContent;
		let passwordContent;
		let newPasswordContent;
		let phoneContent;
		let buttonContent;

		if (!editMode) {
			emailContent = (
				<span className={styles.infoDetail}><b>Email:</b>{" "}{user.email}</span>
			);
			phoneContent = (
				<span className={styles.infoDetail}><b>Phone number:</b>{" "}{user.phone}</span>
			);
			buttonContent = (
				<button className={styles.mainBtn} onClick={onEdit}>
					Edit
				</button>
			);
		} else {
			emailContent = (
				<div>
					<label><b>Email address: </b></label>
					<input
						type="text"
						id={styles.emailinput}
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>
			);
			passwordContent = (
				<div>
					<label><b>Current password (required): </b></label>
					<input
						type="password"
						id={styles.passwordinput}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
			);
			newPasswordContent = (
				<div>
					<label><b>New password: </b></label>
					<input
						type="password"
						id={styles.newpasswordinput}
						value={newPassword}
						onChange={(event) => setNewPassword(event.target.value)}
					/>
				</div>
			);
			phoneContent = (
				<div>
					<label><b>Phone Number: </b></label>
					<input
						type="text"
						id={styles.numberinput}
						value={phoneNumber}
						onChange={(event) => setPhoneNumber(event.target.value)}
					/>
				</div>
			);
			buttonContent = (
				<div className={styles.flexBtn}>
					<button
						type="submit"
						className={styles.mainBtn}
						onClick={updateHandler}
					>
						Save changes
					</button>
					<button
						type="button"
						className={styles.btnCancel}
						onClick={onEditCancelled}
					>
						Cancel
					</button>
				</div>
			);
		}
		
		const renderBookings = () => {
			return user.bookings.map((booking, i) => (
				<div className={styles.flex} key={i}>
					<div className={styles.booking}>
						<div className={styles.bookingContainer}>
							<div className={styles.flex}>
								<div>
									<div>
									<span><b>Movie title:</b>{booking?.screening.movie.title} </span>
									</div>
									{booking.seats.map((seat, i) => (
										<div key={i}>
											<b>Seat: </b>{seat.row}
											{seat.id}
											{" "}
											{seat.type}
										</div>
										
									))}

									<div>
										<span><b>Time: </b>{dayjs(booking?.screening.time).format("MMMM Do HH:mm")}</span>
									</div>
									<div>
										<span><b>Price:</b>{ booking.seats.reduce( (acc, seat) => {
											return acc + (booking.screening.price * getSeatValueWeight(seat.type))
										},0) }</span>
									</div>
								</div>
								<div>
									<button className={styles.btnCancel} onClick={deleteHandler}>Delete</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			));
		};

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
						<div>{buttonContent}</div>
						<div>{message ? <p>{message}</p> : ""}</div>
					</div>
					<div>
						<div className={styles.info}>
							<h6>Last bookings</h6>
							<hr />
						</div>
						<div>{renderBookings()}</div>
					</div>
				</div>
			</div>
		);
	}
};

export default ProfilePage;
