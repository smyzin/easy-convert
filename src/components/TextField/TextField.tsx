import { ChangeEvent, useEffect } from 'react';

import { TextFieldProps } from './TextField.props';
import styles from './TextField.module.css';

export const TextField = ({ name, value = '', type, placeholder, setValue, ...props }: TextFieldProps): JSX.Element => {
	useEffect(() => {
		constructValue(value)
		// eslint-disable-next-line
	}, [value]);

	const constructValue = (currentText: string) => {
		if (setValue) setValue(currentText.replace(/\t/g, '  '))
	};

	const onChange = function onTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
		e.preventDefault();
		constructValue(e.target.value);
	};


	let pHolder = placeholder ? placeholder : '';
	if (!pHolder.length) pHolder = type && type.toLowerCase() === 'json' ? 'Put here your JSON' : 'Get TS interfaces here';

	return (
		<textarea
			spellCheck="false"
			name={name}
			id={name}
			className={styles.textarea}
			cols={30}
			rows={10}
			placeholder={type === 'json' ? 'Put here your JSON' : 'Get TS interfaces here'}
			value={value}
			onChange={onChange}
		></textarea>
	)
}