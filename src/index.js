import React from 'react'
import ReactDom from 'react-dom'
import  App from './App';
import 'antd/dist/antd.css';
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'

        ReactDom.render(
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>,
            document.getElementById('root')
);

