import styles from './ReviewForm.module.css';
import CloseIcon from './clouse.svg';
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import { useForm, Controller } from 'react-hook-form'
import { IReviewForm } from './ReviewForm.interface';


export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit } = useForm<IReviewForm>();

	const onSubmit = (data: IReviewForm) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} >
			<div 
				className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input {...register('name')} placeholder='Имя'/>
				<Input {...register('title')} placeholder='Заголовок отзыва' className={styles.title}/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						render={( {field} ) => (
							<Rating isEditable rating={field.value} ref={field.ref} setRating={field.onChange}/>
						)}// здесь нужно пробросить рефы в сам компонент внутри него
					/>
					
				</div>
				<TextArea {...register('description')} placeholder='Текст отзыва' className={styles.discription} />
				<div className={styles.submit}>
					<Button appearance='primary'>Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}>
					Ваш отзыв отправлен
				</div>
				<div className={styles.successComment}>
					Спасибо, ваш отзыв будет опубликован после проверки
				</div>
				<CloseIcon className={styles.close}/>
			</div>
		</form>	
	);
};