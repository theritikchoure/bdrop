import React from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <App tab="home" />
    </BrowserRouter>
);

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );