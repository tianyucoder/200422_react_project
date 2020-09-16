import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import "./assets/css/reset.css";
import {IntlProvider} from 'react-intl'
import language from '@/locales'

export default function App() {
  return (
    <BrowserRouter>
			<IntlProvider messages={language.zh_TW} locale="en">
				<Layout/>
			</IntlProvider>
    </BrowserRouter>
  );
}
