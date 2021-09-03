import { TextareaHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface TextFieldProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	children?: ReactNode,
	name: string,
	value?: string,
	type?: 'json' | 'ts',
	placeholder?: string,
	setValue?: (value: string) => void
}