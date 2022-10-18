import { useReducer } from "react";
import { createContext, useContextSelector } from "use-context-selector";

const manageArticlesDataStore = () => {
	const initialArticleStateData = {
		PageConfigs: [],
		SelectedPageConfig: null,
	};

	//Context with reducer-------------------------

	const manageArticlesReducer = (state, action) => {
		switch (action.type) {
			case "SEED_STATE":
				return {
					Texts: action.payload.Texts,
					PageConfigs: action.payload.PageConfigs,
					SelectedPageConfig: null,
				};
			case "SET_SELECTED_PAGECONFIG":
				return {
					...state,
					SelectedPageConfig: action.payload.SelectedPageConfig,
				};
			case "UPDATE_PAGECONFIG":
				return {
					...state,
					SelectedPageConfig: action.payload.NewPageConfig,
				};
			default:
				return initialArticleStateData;
		}
	};

	const [articlesState, manageArticlesDispatch] = useReducer(
		manageArticlesReducer,
		initialArticleStateData
	);

	return {
		articlesState,
		manageArticlesDispatch,
	};
};

// Menu Context -----------------------------------------
const ArticleContext = createContext(null);
export const ArticleContextProvider = ({ children }) => (
	<ArticleContext.Provider value={manageArticlesDataStore()}>
		{children}
	</ArticleContext.Provider>
);

const _Actions = {
	SEED_STATE: "SEED_STATE",
	SET_SELECTED_PAGECONFIG: "SET_SELECTED_PAGECONFIG",
	UPDATE_PAGECONFIG: "UPDATE_PAGECONFIG",
};

export const ArticleContext_ArticlesState = () =>
	useContextSelector(ArticleContext, (state) => state.articlesState);
export const ArticleContext_ManageArticlesDispatch = () =>
	useContextSelector(ArticleContext, (state) => state.manageArticlesDispatch);
export const ArticleContext_Actions = () => _Actions;
