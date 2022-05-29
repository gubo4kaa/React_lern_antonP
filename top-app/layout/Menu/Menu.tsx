import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import cn from 'classnames';
import styles from './Menu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { m, motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory} = useContext(AppContext);
	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: { marginBottom: 0}
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 29
		},
		hidden: { opacity: 0, height: 0}
	};

	const openSecondLevl = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m=> {
			if(m._id.secondCategory == secondCategory) {
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const buildFirstLevel = () => {
		return (
			<div className={styles.firstLevelList}>
				{firstLevelMenu.map(m => (
					<div key={m.route} aria-expanded={m.id == firstCategory}>
						<Link href={`/${m.route}`}>
							<a>
								<div className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id == firstCategory
								})}>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>
						{m.id == firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</div>
		);
	};



	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if(m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<li key={m._id.secondCategory}>
						<div className={styles.secondLevel} onClick ={() => openSecondLevl(m._id.secondCategory)}>{m._id.secondCategory}</div>
						<motion.ul 
							layout
							variants={variants}
							initial={m.isOpened ? 'visible' : 'hidden'}
							animate={m.isOpened ? 'visible' : 'hidden' }
							className={styles.secondLevelBlock}
						>
							{buildThirdLevel(m.pages, menuItem.route)}
						</motion.ul>
					</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return(
			pages.map(p => (
				<motion.div key={p._id} variants={variantsChildren}>
					<Link  href={`/${route}/${p.alias}`} >
						<a className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
						})}>
							{p.category}
						</a>
					</Link>
				</motion.div>
				
				
			))
		);
	};
	
	return (
		<div className={styles.menu}>
			{buildFirstLevel()}
		</div>
	);
};



