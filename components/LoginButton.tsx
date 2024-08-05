import { signIn, signOut, useSession } from 'next-auth/react';

const LoginButton: React.FC = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return <button onClick={() => signIn('google')}>Sign in with Google</button>;
};

export default LoginButton;
