import { useState, useEffect } from 'react';

type ThemeColors = {
  bg: string;
  primary: string;
  secondary: string;
  tertiary: string;
  border: string;
  brandGreen: string;
  brandOrange: string;
  brandRed: string;
  lightPrimary: string;
  lightWarm: string;
  lightTaupe: string;
};

const getCssVar = (varName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};

export const useThemeColors = () => {
  const [colors, setColors] = useState<ThemeColors | null>(null);

  useEffect(() => {
    const updateColors = () => {
      setColors({
        bg: getCssVar('--color-dark-bg') || '#0F0B0A',
        primary: getCssVar('--color-dark-primary') || '#121213',
        secondary: getCssVar('--color-dark-secondary') || '#1B1813',
        tertiary: getCssVar('--color-dark-tertiary') || '#232323',
        border: getCssVar('--color-dark-border') || '#28282B',
        brandGreen: getCssVar('--color-brand-green') || '#102C26',
        brandOrange: getCssVar('--color-brand-orange') || '#FF6044',
        brandRed: getCssVar('--color-brand-red') || '#FF4747',
        lightPrimary: getCssVar('--color-light-primary') || '#ECEFF1',
        lightWarm: getCssVar('--color-light-warm') || '#F7E7CE',
        lightTaupe: getCssVar('--color-light-taupe') || '#A79277',
      });
    };

    updateColors();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateColors();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return colors;
};
