import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
	const alertContext = useContext(AlertContext);

	const { alert } = alertContext;

	return (
		alert !== null && (
			<div
				className={`alert alert-${alert.type}`}
				style={{ color: 'bg-primary' }}
			>
				<i className='fa fa-circle-info'></i>
				&ensp;
				{alert.msg}
			</div>
		)
	);
};

export default Alert;
