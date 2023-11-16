import { useEffect } from 'react'
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: "POST" })
      return;
    }
    const tokenDruation = getTokenDuration();
    setTimeout(() => {
      submit(null, { action: '/logout', method: "POST" })
    }, tokenDruation)
  }, [token, submit]);
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
