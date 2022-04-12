import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { useEffect, useState } from 'react';


export const Rating = ({isEditable = false, rating, setRating, ...props}: RatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
	}, [rating]);

	const constructRating = (currentRating: number) => {
		const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
			return( 
				<StarIcon
					className={cn(styles.star, {//class name, для этого нужно изменить файл next-env.d.ts
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable
					})}
					onMouseEnter={() => changeDisplay(i + 1)}// При наведении курсора
					onMouseLeave={() => changeDisplay(rating)}// Когда убироем курсор с объекта
					onClick={() => onClick(i + 1)}
				/>
			);
		});
		setRatingArray(updateArray);
	};

	const changeDisplay = (i: number) => {
		if(!isEditable) {
			return;
		}
		constructRating(i);
	};

	const onClick = (i: number) => {
		if(!isEditable || !setRating) {
			return;
		}
		setRating(i);
	};


	return (
		<div {...props}>
			{ratingArray.map((r,i) => (<span key={i}>{r}</span>))}
		</div>
	);
};