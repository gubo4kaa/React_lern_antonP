import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from 'react';


export const Rating = forwardRef(({error, isEditable = false, rating, setRating, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));// стейт который показывает как выглядит рейтинг

	useEffect(() => {
		constructRating(rating);
	}, [rating]); // подписываемся на рейтинг

	const constructRating = (currentRating: number) => {
		const updateArray = ratingArray.map((r: JSX.Element, i: number) => {//создаёт массив, берёт готовый масив, и обновляет в нём данные
			return( 
			<span
				className={cn(styles.star, {//class name, для этого нужно изменить файл next-env.d.ts
					[styles.filled]: i < currentRating,// если индекс текущего массива меньше чем текущий рейтинг заливаем звезду
					[styles.editable]: isEditable
				})}
				onMouseEnter={() => changeDisplay(i + 1)}// При наведении курсора
				onMouseLeave={() => changeDisplay(rating)}// Когда убироем курсор с объекта
				onClick={() => onClick(i + 1)}
			>
				<StarIcon
					tabIndex={isEditable ? 0: -1}//Обарабатывю событие по табу, на переход на следующий элемент
					onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i+1, e)}//обрабатываем нажатие на пробел функцией handleSpace
				/>
			</span>
				
			);
		});
		setRatingArray(updateArray);//обновляем массив, в зависимости от обновлённого массива
	};

	const changeDisplay = (a: number) => {
		if(!isEditable) {
			return;
		}
		constructRating(a);// изменяем отображение
	};

	const onClick = (i: number) => {
		if(!isEditable || !setRating) {
			return;
		}
		setRating(i);// устанавливаем отображение
	};

	const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
		if(e.code != 'Space' || !setRating) {
			return;
		}
		setRating(i);
	};


	return (
		<div {...props} ref={ref} className={cn(styles.ratingWrapper, {
			[styles.error]: error
		})}>
			{ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
			{error && <span className={styles.errorMessage}>{error.message}</span>}
		</div>//реату обязательно нужен ключ оъекта массива, для того,что бы следить за его изменениями
	);
});
