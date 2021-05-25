import React from "react";
import styles from "../css/ProfilePage.module.css";


const ProfilePage = () => {
	return (
		<div className={styles.container}>
			<h3>Welcome!</h3>
			<div className={styles.flex}>
				<div className={styles.info}>
					<div>
						<h6>Personal information</h6>
					</div>
					<hr></hr>
					<div className={styles.flex}>
						<span className={styles.infoDetail}>
							Email: (comes from register page-data
						</span>
						<button className={styles.btn}>Edit</button>
					</div>
                    <div className={styles.flex}>
						<span className={styles.infoDetail}>
							Phone number: (comes from register page-data
						</span>
						<button className={styles.btn}>Edit</button>
					</div>
					<div className={styles.flex}>
						<span className={styles.infoDetail}>
							Password: (comes from register page-data
						</span>
						<button className={styles.btn}>Edit</button>
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
			<button className={styles.mainBtn}>Save changes</button>
		</div>
	);
};

export default ProfilePage;
