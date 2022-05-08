import styles from './Card.module.css';
import { ReviewProps } from './Review.props';
import cn from 'classnames';


export const Review = ({color = 'white', children, className, ...props}: ReviewProps): JSX.Element => {
	return (
		<div className={cn(styles.card, className, {
			[styles.blue]: color == 'blue'
		})}
			{...props}
		>
			{children}
		</div>
	);
};