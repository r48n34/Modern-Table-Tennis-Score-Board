import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Toaster } from 'react-hot-toast';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider defaultColorScheme="auto">
    <Toaster
      position="top-left"
    />
    <App />
    </MantineProvider>
  </React.StrictMode>,
)
