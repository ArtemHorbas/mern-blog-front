import React from 'react'
import './index.scss'
import { createRoot } from 'react-dom/client'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
	<>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</ThemeProvider>
	</>
)
