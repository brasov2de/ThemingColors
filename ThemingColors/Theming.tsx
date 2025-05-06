import * as React from 'react';
import { BrandVariants, createDarkTheme, Label, Theme } from '@fluentui/react-components';
import { TExtendedTheme } from './Schema/types';

export interface IThemingProps {
  isDarkMode ?: boolean;
  brand?: BrandVariants;
  theme: Theme;
  accent1ForegroundColor?: string;
  accent2ForegroundColor?: string;
  accent1BackgroundColor?: string;
  accent2BackgroundColor?: string;
  accent1BorderColor?: string;
  accent2BorderColor?: string;
  onChange: (newTheme:  Theme & TExtendedTheme) => void;
}

export const Theming: React.FunctionComponent<IThemingProps> = ({onChange, theme, isDarkMode, brand, 
  accent1BackgroundColor, accent1ForegroundColor, accent1BorderColor,
  accent2BackgroundColor, accent2ForegroundColor, accent2BorderColor
}: IThemingProps) => {  
  const isDark = React.useRef<boolean |undefined>(undefined);
  
  const wraptoExtendedTheme = (theme: Theme) => {   
    return  {...theme, 
      accent1BackgroundColor : accent1BackgroundColor 
        ? (theme as any)?.[accent1BackgroundColor] ?? accent1BackgroundColor 
        : theme?.colorBrandBackground,
      accent1ForegroundColor : accent1ForegroundColor 
        ? (theme as any)?.[accent1ForegroundColor ] ?? accent1ForegroundColor 
        : theme?.colorBrandForeground1,
      accent1BorderColor : accent1BorderColor 
        ? (theme as any)?.[accent1BorderColor ] ?? accent1BorderColor 
        : theme?.colorBrandStroke1,
      accent2BackgroundColor : accent2BackgroundColor 
        ? (theme as any)?.[accent2BackgroundColor] ?? accent2BackgroundColor
        : theme?.colorBrandBackground,
      accent2ForegroundColor : accent2ForegroundColor 
        ? (theme as any)?.[accent2ForegroundColor ] ?? accent2ForegroundColor 
        : theme?.colorBrandForeground1,
      accent2BorderColor : accent2BorderColor 
        ? (theme as any)?.[accent2BorderColor] ?? accent2BorderColor 
        : theme?.colorBrandStroke1
    }
  }

  React.useEffect(() => {
    const tempTheme = isDarkMode 
        ? createDarkTheme(brand as BrandVariants)
        : theme;    
    onChange(wraptoExtendedTheme(tempTheme));

  }, [theme, accent1BackgroundColor, accent1ForegroundColor, accent1BorderColor,
    accent2BackgroundColor, accent2ForegroundColor, accent2BorderColor, 
  isDarkMode, brand]);

  React.useEffect(() => {
    if (isDark.current !== isDarkMode) {
      isDark.current = isDarkMode;
      const tempTheme = isDarkMode 
        ? createDarkTheme(brand as BrandVariants)
        : theme;             
      onChange(wraptoExtendedTheme(tempTheme));
    }
  }, [isDarkMode]);

    return <></>    
}
