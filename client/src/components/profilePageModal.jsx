import React, { useState } from "react";
import styles from "../css/Modal.module.css";

const Modal = (props) => {
	const handleDelete = () => {
		props.onDelete();
		props.onClose();
	};

	if (!props.showModal) {
		return null;
	}

	return (
		<div className={styles.modal} onClick={props.onClose}>
			<div className={styles.card} onClick={(e) => e.stopPropagation()}>
				<div className={styles.wrapper}>
					<p>Are you sure you want to unbook this booking?</p>
					<button className={styles.btn} onClick={handleDelete}>
						Yes
					</button>
					<button className={styles.btn} onClick={props.onClose}>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
