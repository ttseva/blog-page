import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [settings, setSettings] = useState(defaultArticleState);

	const handleApply = (newSettings: ArticleStateType) => {
		setSettings(newSettings);
		setIsFormOpen(false); // Закрываем форму после применения
	};

	// Обработчик для "Сбросить"
	const handleReset = () => {
		setSettings(defaultArticleState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentState={articleState}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
