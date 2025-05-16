import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { AppState, TelegramUser, Video } from '../types';
import { videos } from '../data/videos';

type AppAction = 
  | { type: 'SET_CURRENT_VIDEO_INDEX'; payload: number }
  | { type: 'OPEN_GAME_MODAL'; payload: string }
  | { type: 'CLOSE_GAME_MODAL' }
  | { type: 'SET_USER'; payload: TelegramUser }
  | { type: 'ADD_VIDEOS'; payload: Video[] };

const initialState: AppState = {
  videos: videos,
  currentVideoIndex: 0,
  isGameModalOpen: false,
  currentGame: null,
  user: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Listen for openGame event
    const handleOpenGame = (event: CustomEvent<{ gameUrl: string }>) => {
      dispatch({ type: 'OPEN_GAME_MODAL', payload: event.detail.gameUrl });
    };

    window.addEventListener('openGame', handleOpenGame as EventListener);
    return () => window.removeEventListener('openGame', handleOpenGame as EventListener);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_CURRENT_VIDEO_INDEX':
      return {
        ...state,
        currentVideoIndex: action.payload,
      };
    case 'OPEN_GAME_MODAL':
      return {
        ...state,
        isGameModalOpen: true,
        currentGame: action.payload,
      };
    case 'CLOSE_GAME_MODAL':
      return {
        ...state,
        isGameModalOpen: false,
        currentGame: null,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'ADD_VIDEOS':
      return {
        ...state,
        videos: [...state.videos, ...action.payload],
      };
    default:
      return state;
  }
};

export const useAppContext = () => useContext(AppContext);