import React, { lazy, Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/layout/Header'
import Body from './components/pages/Body'
import Footer from './components/layout/Footer'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Error from './components/pages/Error'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import RestaurantMenu from './components/pages/RestaurantMenu'
import UserContext from './utils/UserContext'
import { Provider } from 'react-redux'
import AboutClass from './components/_archive/AboutClass'
import appStore from './utils/appStore'
import Cart from './components/pages/Cart'
import CollectionPage from './components/pages/CollectionPage'

const Grocery = lazy(() => import('./components/pages/Grocery'))
// it's not same import as above, it's dynamic import... a function

const AppLayout = () => {
  const [ userName, setUserName ] = useState([])
  // authentication
  useEffect(() => {
    // make api call and send username and password
    const data = {
      name: 'User',
    }
    setUserName(data.name)
  }, [])

  return (
    <Provider store = {appStore}>
    <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserContext.Provider>
    </Provider>
  )
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: <About />,
        // element: <AboutClass />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/restaurant/:resId',
        element: <RestaurantMenu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/collection/:slug',
        element: <CollectionPage />,
      },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<div className="page-loading"><span className="page-loading-spinner" /></div>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={appRouter} />)

// lazy loading is a technique in which we load only the required part of the application and not the entire application at once
// we can use lazy loading with react-router-dom by using dynamic import
