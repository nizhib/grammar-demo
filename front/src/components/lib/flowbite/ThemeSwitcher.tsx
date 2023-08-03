import { Component, createContext, createEffect, ParentComponent, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

import { HiSolidMoon, HiSolidSun } from 'solid-icons/hi';

import Button from './Button';

interface ThemeContextState {
  colorScheme: 'light' | 'dark';
}
interface ThemeContextActions {
  switchColorsScheme: () => void;
}

const ThemeContext = createContext<[ThemeContextState, ThemeContextActions]>();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(`Context 'ThemeContext' is null. Did you use <ThemeContextProvider>?`);
  }
  return context;
};

export const ThemeProvider: ParentComponent = (props) => {
  const [state, setState] = createStore<ThemeContextState>({ colorScheme: 'light' });
  const actions: ThemeContextActions = {
    switchColorsScheme: () => {
      setState({ colorScheme: state.colorScheme === 'light' ? 'dark' : 'light' });
    },
  };

  // use dark theme if stored locally or browser-preferred when the storage is empty
  const localTheme = localStorage.getItem('color-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (localTheme === 'dark' || (!localTheme && prefersDark)) {
    setState({ colorScheme: 'dark' });
  }

  // update the locally stored theme accordingly
  createEffect(() => {
    localStorage.setItem('color-theme', state.colorScheme);
  });

  return (
    <div classList={{ dark: state.colorScheme === 'dark' }}>
      <ThemeContext.Provider value={[state, actions]}>{props.children}</ThemeContext.Provider>
    </div>
  );
};

const ThemeSwitcher: Component = () => {
  const [state, actions] = useThemeContext();

  return (
    <Button onClick={actions.switchColorsScheme} intent="transparent" size="sq">
      {state.colorScheme === 'light' && <HiSolidMoon class="h-5 w-5" />}
      {state.colorScheme === 'dark' && <HiSolidSun class="h-5 w-5" />}
    </Button>
  );
};

export default ThemeSwitcher;
