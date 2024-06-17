import { tr } from "date-fns/locale";
import React, { createContext, useReducer, ReactNode, useContext } from "react";

interface ArticleContextType {
  imageUrl: string;
  history: boolean;
  title: string;
  content: string;
  country: string;
  startYear: number | undefined;
  endYear: number  | undefined;
  sources: string[];
  categories: string[];
}

const initialArticleState: ArticleContextType = {
  imageUrl: "",
  title: "",
  content: "",
  country: "",
  startYear: undefined,
  endYear: undefined,
  sources: [],
  categories: [],
  history: true
};


type ArticleActionType =
  | { type: "SET_IMAGE_URL"; payload: string }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "SET_COUNTRY"; payload: string }
  | { type: "SET_START_YEAR"; payload: number | undefined}
  | { type: "SET_END_YEAR"; payload: number | undefined}
  | { type: "SET_SOURCES"; payload: string[] }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "RESET" }
  | { type: "HISTORY"; payload: boolean}; 

const articleReducer = (
  state: ArticleContextType,
  action: ArticleActionType
): ArticleContextType => {
  switch (action.type) {
    case "SET_IMAGE_URL":
      return { ...state, imageUrl: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_CONTENT":
      return { ...state, content: action.payload };
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    case "SET_START_YEAR":
      return { ...state, startYear: action.payload };
    case "SET_END_YEAR":
      return { ...state, endYear: action.payload };
    case "SET_SOURCES":
      return { ...state, sources: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "RESET":
      return initialArticleState;
    case "HISTORY":
      return {...state, history: action.payload};
    default:
      return state;
  }
};

export const ArticleContext = createContext<{
  state: ArticleContextType;
  dispatch: React.Dispatch<ArticleActionType>;
} | null>(null);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(articleReducer, initialArticleState);

  return (
    <ArticleContext.Provider value={{ state, dispatch }}>
      {children}
    </ArticleContext.Provider>
  );
};
