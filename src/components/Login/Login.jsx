import React, {
	useState,
	useEffect,
	useReducer,
	useContext,
	useRef,
} from 'react';

import UserInput from '../Input/UserInput';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../Store/auth-context';

// Reducer Function
const emaiReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes('@') };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') };
	}
	return { value: '', isValid: false };
};

const passWordReducer = (state, action) => {
	if (action.type === 'PASSWORD') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'PASSOWRD_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: '', isValid: false };
};

const Login = (props) => {
	const [formIsValid, setFormIsValid] = useState(false);

	// Reducer function for email valiue and validity
	const [emailState, dispatchEmail] = useReducer(emaiReducer, {
		value: '', // Stores input value
		isValid: null, //Check input status
	});

	const [passwordSate, dispatchPassWord] = useReducer(passWordReducer, {
		value: '',
		isValid: null,
	});

	//Context Authentication
	const authCtx = useContext(AuthContext);

	//Activate user-input focus
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	// Alias Assignment to further optimize useEffect
	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordSate;

	useEffect(() => {
		const identify = setTimeout(() => {
			console.log('Checking form validity');
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 400);

		return () => {
			console.log('Clean-up');
			clearTimeout(identify);
		};
	}, [emailIsValid, passwordIsValid]); // check for changes then re-run

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
	};

	const passwordChangeHandler = (event) => {
		dispatchPassWord({ type: 'PASSWORD', val: event.target.value });
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPassWord({ type: 'PASSOWRD_BLUR' });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passwordSate.value);
		} else if (!emailIsValid) {
      emailInputRef.current.focus(); // activate function from userinput.jsx
		} else {
      passwordInputRef.current.focus()
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<UserInput
					ref={emailInputRef}
					isValid={emailIsValid}
					label="E-Mail"
					type="email"
					id="email"
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>

				<UserInput
					ref={passwordInputRef}
					isValid={passwordIsValid}
					label="Password"
					type="password"
					id="password"
					value={passwordSate.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
