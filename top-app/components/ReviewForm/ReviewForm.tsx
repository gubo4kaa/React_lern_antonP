import styles from './ReviewForm.module.css';
import CloseIcon from './clouse.svg';
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import { useForm, Controller } from 'react-hook-form'
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';


export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
	const[isSuccess, setIsSuccess] = useState<boolean>(false);
	const[error, setError] = useState<string>();


	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
			
			if(data.message) {
				setIsSuccess(true);
				reset();
				console.log('ok!')
			} else {
				console.log('error!!!')
				setError('Что то пошла не так')
			}
		} catch(e: any) {
			setError(e.message);
		}
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
					className={styles.description} 
					error={errors.description}
				/>
				<div className={styles.submit}>
					<Button appearance='primary'>Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccess && <div className={cn(styles.success, styles.panel)}>
				<div className={styles.successTitle}>
					Ваш отзыв отправлен
				</div>
				<div className={styles.successComment}>
					Спасибо, ваш отзыв будет опубликован после проверки
				</div>
				<CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
			</div>}
			{error && <div className={cn(styles.error, styles.panel)}>
				Что-то пошло не так, попробуйте обновить страницу
				<CloseIcon className={styles.close} onClick={() => setError(undefined)} />
			</div>}
			
		</form>	
	);
};