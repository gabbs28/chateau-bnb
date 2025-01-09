import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';

import SpotsDetails from './components/SpotsDetails';
import LandingPage from './components/LandingPage';
import Example from './components/Example';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}
//routes are the entry point
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/spots/:spotId',
        element: <SpotsDetails />
      },
      {
        path: '/spots/new',
        element: <h1>New Spots Form</h1>
      },
      {
        path: '/spots/:id/edit',
        element: <h1>Edit Spots Form</h1>
      },
      {
        path: '/spots/current',
        element: <h1>Manage User Spots</h1>
      },
      {
        path: '/example',
        element: <Example/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
