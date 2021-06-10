import React, { useState } from "react";
import styles from "../css/Modal.module.css";

const Modal = (props) => {
	if (!props.showModal) {
		return null;
	}

	return (
		<div className={styles.modal} onClick={props.onClose}>
			<div classname={styles.card}>
				<p>Do you really want to unbook this booking?</p>
				<button onClick={props.onDelete}>Yes</button>
				<button onClick={props.onClose}>No</button>
			</div>
		</div>
	);
};

export default Modal;
