import styles from './P.module.css';
import { InputProps } from './Input.props';
import cn from 'classnames';


export const Input = ({ className,...props}: InputProps): JSX.Element => {
	return (
		<input className={cn(className, styles.input)} {...props} />
	);
};