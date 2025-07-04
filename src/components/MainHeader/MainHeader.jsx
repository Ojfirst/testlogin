import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import Button from '../UI/Button/Button';

const MainHeader = () => {
	return (
		<header className={classes['main-header']}>
			<h1>Typical Login Page</h1>
			<Navigation />
		</header>
	);
};

export default MainHeader;
