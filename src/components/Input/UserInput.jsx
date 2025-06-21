import React, { useImperativeHandle, useRef } from 'react';
import classes from './UserInput.module.css';

//ForwardRef allows forwarding of ref(useRaf())/ Componenet bound to a ref
const UserInput = React.forwardRef((props, ref) => {
	const inputRef = useRef();

	// Used to parse in inputRef in input element
	const activate = () => {
		inputRef.current.focus();
	};

	// Data to be use out of this component
	useImperativeHandle(ref, () => {
		return {
			focus: activate, // focus is the external set here
		};
	});

	return (
		<div
			className={`${classes.control} ${
				props.isValid === false ? classes.invalid : ''
			}`}>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				ref={inputRef}
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
		</div>
	);
});

export default UserInput;

// useEffect(() => {
// 	inputRef.current.focus();
// }, []);
