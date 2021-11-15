import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { UserProvider } from 'contexts/UserAuthContext';

import { Routes } from 'routes';
import theme from 'theme';
import classNames from 'classnames';

function App() {
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    const language: any = localStorage.getItem('language');
    const html = document.getElementById('dln-html');
    // check and set language logic
    if (language) {
      if (language === 'ar') {
        setIsArabic(true);
        if (html) {
          html.dir = 'rtl';
        }
      } else if (html) {
        html.dir = 'ltr';
      }
    } else {
      setIsArabic(false);
      if (html) {
        html.dir = 'ltr';
      }
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <div className={classNames('App h-100', isArabic && 'app-arabic-lang')}>
          <div className='App-intro h-100'>
            <HashRouter>
              <div className='page h-100'>
                <Routes />
              </div>
            </HashRouter>
          </div>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export { App };
