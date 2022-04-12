import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { useEffect, useState } from 'react';


export const Rating = ({isEditable = false, rating, setRating, ...props}: RatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));// стейт который показывает как выглядит рейтинг

	useEffect(() => {
		constructRating(rating);
	}, [rating]); // подписываемся на рейтинг

	const constructRating = (currentRating: number) => {
		const updateArray = ratingArray.map((r: JSX.Element, i: number) => {//создаёт массив, берёт готовый масив, и обновляет в нём данные
			return( 
				<StarIcon
					className={cn(styles.star, {//class name, для этого нужно изменить файл next-env.d.ts
						[styles.filled]: i < currentRating,// если индекс текущего массива меньше чем текущий рейтинг заливаем звезду
						[styles.editable]: isEditable
					})}
					onMouseEnter={() => changeDisplay(i + 1)}// При наведении курсора
					onMouseLeave={() => changeDisplay(rating)}// Когда убироем курсор с объекта
					onClick={() => onClick(i + 1)}
				/>
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


	return (
		<div {...props}>
			{ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
		</div>//реату обязательно нужен ключ оъекта массива, для того,что бы следить за его изменениями
	);
};