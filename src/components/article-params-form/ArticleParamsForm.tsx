import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Spacing } from '../spacing';
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
	onChange: (settings: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	currentState,
	onChange,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggle = () => setIsOpen(!isOpen);
	
	const sidebarRef = useRef<HTMLDivElement>(null);
	const handleClickOutside = (e: MouseEvent) => {
		if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node))
			setIsOpen(false); 
	};
	useEffect(() => {
		if (isOpen) document.addEventListener('mousedown', handleClickOutside);
		else document.removeEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const [fontFamilyValue, setFontFamilyValue] = useState<OptionType>(
		currentState.fontFamilyOption
	);
	const [fontSizeValue, setFontSizeValue] = useState<OptionType>(
		currentState.fontSizeOption
	);
	const [fontColorValue, setFontColorValue] = useState<OptionType>(
		currentState.fontColor
	);
	const [backgroundColorValue, setBackgroundColorValue] = useState<OptionType>(
		currentState.backgroundColor
	);
	const [contentWidthValue, setContentWidthValue] = useState<OptionType>(
		currentState.contentWidth
	);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				ref={sidebarRef} // Привязываем ссылку к контейнеру сайдбара
				className={clsx(
					styles.container,
					isOpen ? styles.container_open : null
				)}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Spacing size={50} />

					<Select
						selected={fontFamilyValue}
						options={fontFamilyOptions}
						onChange={setFontFamilyValue}
						title='ШРИФТ'
					/>

					<Spacing size={50} />

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={fontSizeValue}
						onChange={setFontSizeValue}
						title='Размер шрифта'
					/>

					<Spacing size={50} />

					<Select
						selected={fontColorValue}
						options={fontColors}
						placeholder='Выберите цвет текста'
						onChange={setFontColorValue}
						title='Цвет шрифта'
					/>

					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColorValue}
						onChange={setBackgroundColorValue}
						placeholder='Выберите цвет фона'
					/>

					<Spacing size={50} />

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidthValue}
						onChange={setContentWidthValue}
						placeholder='Выберите ширину'
					/>

					<Spacing size={50} />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={onReset} />
						<Button
							title='Применить'
							type='submit'
							onClick={(e) => {
								e.preventDefault();
								const updatedState = {
									...currentState,
									fontFamilyOption: fontFamilyValue,
									fontSizeOption: fontSizeValue,
									fontColor: fontColorValue,
									backgroundColor: backgroundColorValue,
									contentWidth: contentWidthValue,
								};
								onChange(updatedState);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
