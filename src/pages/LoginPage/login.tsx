import { LoginForm } from '../../components/login-form';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cinza/10">
            <div className="w-full max-w-4xl p-4 md:p-0">
                <LoginForm />
            </div>
        </div>
    );
} 