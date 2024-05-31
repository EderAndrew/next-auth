import AuthForm from '@/components/auth-form';

const Home = async({ searchParams }: {searchParams: {mode: string}}) => {
  const formMode = searchParams.mode || 'login'
  return <AuthForm />;
}

export default Home