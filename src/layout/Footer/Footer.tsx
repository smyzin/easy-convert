import cn from 'classnames';
import { format } from 'date-fns';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div className={cn(styles.footer__made)}>Made with ❤️ and ☕️</div>
			<div className={cn(styles.footer__copyright)}>&copy; 2020 - {format(new Date(), 'yyyy')} Все права защищены</div>
			<div className={cn(styles.author)}>Created by Myzin Sergei {'<smyzin.work@gmail.com>'}</div>
		</footer>
	);
};