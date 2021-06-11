import React, { useState } from "react";
import styles from "../css/Modal.module.css";

const Modal = (props) => {
	if (!props.showModal) {
		return null;
	}

	return (
		<div className={styles.modal} onClick={props.onClose}>
			<div className={styles.card}>
				<div classname={styles.wrapper}>
					<p>Are you sure you want to unbook this booking?</p>
					<button onClick={props.onDelete}>Yes</button>
					<button onClick={props.onClose}>No</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
