import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import {darkTheme, lightTheme} from "./theme.js";

// eslint-disable-next-line react-refresh/only-export-components
const Root = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <StrictMode>
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                <App toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            </ThemeProvider>
        </StrictMode>
    );
};

createRoot(document.getElementById('root')).render(<Root />);