import React, { createContext, useReducer, ReactNode, useContext } from "react";

interface ArticleContextType {
  imageUrl: string;
  title: string;
  content: string;
  country: string;
  startYear: number | undefined;
  endYear: number  | undefined;
  sources: string[];
  categories: category[];
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
};

type category = {
  name: string;
  id?: number;
}
type ArticleActionType =
  | { type: "SET_IMAGE_URL"; payload: string }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "SET_COUNTRY"; payload: string }
  | { type: "SET_START_YEAR"; payload: number | undefined}
  | { type: "SET_END_YEAR"; payload: number | undefined}
  | { type: "SET_SOURCES"; payload: string[] }
  | { type: "SET_CATEGORIES"; payload: category[] };

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
