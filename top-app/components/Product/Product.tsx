import styles from './Product.module.css';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';


export const Product = ({product, className, ...props}: ProductProps): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)// useState, это хуук для состояния открытия продукта
	const srcImg: string  = process.env.NEXT_PUBLIC_DOMAIN as string;
	const srcImgData:string = product.image as unknown as string;
	const reviewRef = useRef<HTMLDivElement>(null);//создаём хукРеф, и в него внизу передадим див елемент, что бы потом к нему возваращаться

	const scrollToReview = () => {//Перед пробросом рефа, нужно пробросить его в сам компонент карт!!
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}

	return (
		<div className={className} {...props}>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image // перед этим нужно настроить next.config там нужно добавить домен с которого будут грузиться картинки
						//src={srcImg + product.image}
						src={/^https?:\/\//i.test(srcImgData) ? srcImgData : srcImg + srcImgData}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice && <Tag className={styles.oldPrice} color='green' key={product.price}>{priceRu(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}/<span className={styles.month}>мес</span>
				</div>
				<div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
				<div className={styles.tags}>{product.categories.map(c => <Tag className={styles.category} key={c} color='ghost'>{c}</Tag>)}</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>кредит</div>
				<div className={styles.rateTitle}><a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв','отзыва','отзывов'])}</a></div>
				
				<Divider className={styles.hr}/>
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}> 
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
				{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						<div >{product.advantages}</div>
						
					</div>}
					{product.disadvantages &&<div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						<div>{product.disadvantages}</div>	
					</div>}
				</div>
				<Divider className={styles.hr}/>
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button 
						appearance='ghost' 
						arrow={isReviewOpened ? 'down' : 'right'} 
						className={styles.reviewButton}
						onClick={() => setIsReviewOpened(!isReviewOpened)} // хороший пример исползования state!!!!!!!!!!!!!!
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<Card color='blue' className={cn(styles.reviews, {// хороший пример исползования state!!!!!!!!!!!!!!
				[styles.opened]: isReviewOpened,
				[styles.closed]: !isReviewOpened,
			})} ref={reviewRef}>
				{product.reviews.map(r => (
					<div key={r._id}>
						<Review  review={r} />
						<Divider/>
					</div>
					
				))}
				<ReviewForm productId={product._id} />
			</Card>
		</div>
		
	);
};