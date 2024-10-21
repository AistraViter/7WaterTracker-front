import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SharedLayout } from "../components/SharedLayout/SharedLayout.jsx"
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute.jsx"
import { RestrictedRoute} from "../components/RestrictedRoute/RestrictedRoute.jsx"

import css from "./App.module.css"

const HomePage = lazy(()=> import ("../pages/HomePage/HomePage.jsx"))
const SignUpPage = lazy(() => import("../pages/SignupPage/SignupPage.jsx"))
const SignInPage = lazy(() => import("../pages/SigninPage/SigninPage.jsx"));  
const WelcomePage = lazy(() => import("../pages/WelcomePage/WelcomePage.jsx"));  
{/* писати маршрути нижче */}

const NotFoundPage = lazy(() => import ("../pages/NotFoundPage/NotFoundPage.jsx"))

export default function App() {

  return (
    <div className={css.app}>
      {/* замінимо на Loader пізніше  */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
          <Route path="/welcome" element={<WelcomePage />}></Route>
          <Route path="/signup" element={<RestrictedRoute redirectTo="/home" component={<SignUpPage />} />}></Route>
          <Route path="/signin" element={<RestrictedRoute redirectTo="/home" component={<SignInPage />} />}></Route>
          <Route path="/home" element={<PrivateRoute redirectTo="/signin" component={<HomePage />} />}></Route>
          {/* писати маршрути нижче */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

