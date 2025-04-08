import { useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';

import {
	OptionType,
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	currentState: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState(currentState);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				className={clsx(
					styles.container,
					isOpen ? styles.container_open : null
				)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
