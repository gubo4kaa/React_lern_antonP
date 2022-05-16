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
	const { register, control, handleSubmit, formState: { errors } } = useForm<IReviewForm>();

	const onSubmit = (data: IReviewForm) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} >
			<div 
				className={cn(styles.reviewForm, className)}
				{...props}// в строке импут показана обработка ошибки, requared- обработка ошибки, value: вклюяение обработки обязательного поля, message: сообщение поля, ещё нужно добавить состояние формы 
			>
				<Input 
					{...register('name', {required: {value: true, message: 'Заполните имя'}})} 
					placeholder='Имя'
					error={errors.name}
				/>
				<Input 
				{...register('title', {required: {value: true, message: 'Заполните заголовок'}})} 
				placeholder='Заголовок отзыва' 
				className={styles.title}
				error={errors.title}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{required: {value: true, message: 'Укажите рейтинг'}}}
						render={( {field} ) => (
							<Rating 
							isEditable rating={field.value} 
							ref={field.ref} 
							setRating={field.onChange}
							error={errors.rating}
							/>
						)}// здесь нужно пробросить рефы в сам компонент внутри него. Контроллера принимает рулсы внутри него
					/>
					
				</div>
				<TextArea 
					{...register('description', {required: {value: true, message: 'Заполните описание'}})} // Обработка ошибки импута, перед эти подправаили текст ареа
					placeholder='Текст отзыва' 
					className={styles.discription} 
					error={errors.description}
				/>
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