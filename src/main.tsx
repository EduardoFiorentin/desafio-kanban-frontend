import React from 'react'
import ReactDOM from 'react-dom/client'
import { SignUp } from './pages/SignUp';
import './assets/css/index.css'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { SignIn } from './pages/SignIn';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Tests } from './pages/Tests';
import { Board } from './pages/Board';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin"/>
  }
  ,{
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/signin",
    element: <SignIn/>
  },
  {
    path: "/board",
    element: <Board/>
  },
  {
    path: "/tests",
    element: <Tests/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>,
)
