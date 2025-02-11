import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';

import SpotsDetails from './components/SpotsDetails';
import LandingPage from './components/LandingPage';
import Example from './components/Example';
import CreateSpotForm from './components/CreateSpotForm';
import EditSpotForm from './components/EditSpotForm';

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
        element: <CreateSpotForm />
      },
      {
        path: '/spots/:spotId/edit',
        element: <EditSpotForm />
      },
      {
        path: '/spots/current',
        element: <h1>Manage User Spots</h1>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
