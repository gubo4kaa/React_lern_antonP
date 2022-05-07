import styles from './Adventages.module.css';
import { AdventagesProps } from './Adventages.props';
import React from 'react';
import CheckIcon from './check.svg';



export const Adventages = ({advantages}: AdventagesProps): JSX.Element => {
	return (
		<>
			{advantages.map(a =>(
				<div key={a._id} className={styles.advantages}>
					<CheckIcon/>
					<div className={styles.title}>{a.title}</div>
					<hr className={styles.vline}/>
					<div>{a.description}</div>
				</div>
			))}
		</>
	);
};
