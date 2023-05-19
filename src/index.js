import React from 'react';
import './assets/css/style.css';
import WrappedApp from './App';
import reportWebVitals from './reportWebVitals';

import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import {createRoot} from "react-dom/client";

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<WrappedApp />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
