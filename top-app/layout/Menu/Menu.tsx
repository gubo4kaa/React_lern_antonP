import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import cn from 'classnames';
import styles from './Menu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory} = useContext(AppContext);
	const router = useRouter();

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
			<div className={styles.secondBlock}>
				{menu.map(p => {
					if(p.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						p.isOpened = true;
					}
					return (
						<div key={p._id.secondCategory}>
						<div className={styles.secondLevel} onClick ={() => openSecondLevl(p._id.secondCategory)}>{p._id.secondCategory}</div>
						<div className={cn(styles.secondLevelBlock, {
							[styles.secondLevelBlockOpened]: p.isOpened
						})}>
							{buildThirdLevel(p.pages, menuItem.route)}
						</div>
					</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return(
			pages.map(p => (
				<Link  href={`/${route}/${p.alias}`} key={p._id}>
					<a className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
					})}>
					{p.category}
				</a>
				</Link>
				
			))
		);
	};
	
	return (
		<div className={styles.menu}>
			{buildFirstLevel()}
		</div>
	);
};



