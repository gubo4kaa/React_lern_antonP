import styles from './Product.module.css';
import { ProductProps } from './Product.props';
import cn from 'classnames';


export const Product = ({size = 'm', children, className, ...props}: ProductProps): JSX.Element => {
	return (
		<p
			className={cn(styles.p, className, {
				[styles.s]: size == 's',
				[styles.m]: size == 'm',
				[styles.l]: size == 'l',
			})}
			{...props}
		>
			{children}
		</p>
	);
};