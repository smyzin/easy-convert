import styles from './Description.module.css';

export const Description = ({ ...props }): JSX.Element => {
	return (
		<h1 className={styles.description}>
			Instantly generate JSON to TypeScript interfaces
		</h1>
	)
}