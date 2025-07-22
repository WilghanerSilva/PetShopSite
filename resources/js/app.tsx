import '../css/app.css';
import '../css/index.css';

import { createInertiaApp } from '@inertiajs/react';
import React from "react";
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import { PosSessionProvider } from "./context/PosSessionContext";

const pages = import.meta.glob('./pages/**/*.tsx');

createInertiaApp({
  resolve: name =>
  (pages[`./pages/${name}.tsx`] as () => Promise<{ default: React.ComponentType }> )()
    .then(module => module.default),
  setup({ el, App, props }) {
    createRoot(el).render(
      <React.StrictMode>
        <HelmetProvider>
            <ThemeProvider>
                <PosSessionProvider>
                    <App {...props} />
                </PosSessionProvider>
            </ThemeProvider>
        </HelmetProvider>
      </React.StrictMode>
    );
  },
});
