import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const LoginButton: React.FC = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const saveUserToBackend = async () => {
      if (session?.user) {
        try {
          // CSRF トークンの取得
          const csrfToken = await fetchCSRFToken();

          const res = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify({
              user: {
                email: session.user.email,
                name: session.user.name,
                provider: 'google',
                uid: session.user.id
              },
            }),
            credentials: 'include',
          });

          if (res.ok) {
            await res.json();
          } else {
            const errorBody = await res.json();
            console.error('Failed to save user:', errorBody);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    };

    saveUserToBackend();
  }, [session]);

  if (session?.user) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return <button onClick={() => signIn('google')}>Sign in with Google</button>;
};

export default LoginButton;

async function fetchCSRFToken() {
  try {
    const response = await fetch('http://localhost:3001/csrf_token', {
      credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
}
