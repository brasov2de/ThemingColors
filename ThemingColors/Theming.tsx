import * as React from 'react';
import { BrandVariants, createDarkTheme, Label, Theme } from '@fluentui/react-components';

export interface IThemingProps {
  isDarkMode: boolean;
  brand?: BrandVariants;
  theme: Theme;
  onChange: (newTheme: Theme) => void;
}

export const Theming: React.FunctionComponent<IThemingProps> = ({onChange, theme, isDarkMode, brand}: IThemingProps) => {
  const myTheme = React.useRef<Theme | undefined>(theme);
  const isDark = React.useRef(isDarkMode);
  
  React.useEffect(() => {
    myTheme.current = theme;    
    onChange(theme);
  }, [theme]);

  React.useEffect(() => {
    if (isDark.current !== isDarkMode) {
      isDark.current = isDarkMode;
      myTheme.current = isDarkMode 
        ? createDarkTheme(brand as BrandVariants)
        : theme;       
      onChange(myTheme.current);
    }
  }, [isDarkMode]);

    return <></>    
}
