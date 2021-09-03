import { FunctionComponent } from 'react';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import { Footer } from './Footer/Footer';

const Layout = ({ children, ...props }: LayoutProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.body}>
				{children}
			</div>
			<Footer className={styles.footer} />
		</div>
	);
};

export const WithLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
	return function WithLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	}
}