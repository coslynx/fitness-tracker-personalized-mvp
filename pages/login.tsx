import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';
import Button from '@/components/Button';

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const store = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (session) {
        store.setNotification({
          type: 'success',
          message: 'Logged in successfully!',
        });
        router.push('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error: any) {
      setError('Error logging in. Please try again later.');
      console.error('Error logging in:', error);
    }
  };

  if (status === 'authenticated') {
    router.push('/dashboard');
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="primary" onClick={handleSubmit}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;