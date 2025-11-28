import type {Metadata} from 'next';
import { ForgotPasswordForm } from './forgot-password-form';

export const metadata: Metadata = {
    title: 'Forgot Password',
    description: 'Reset your password to regain access to your account.',
};

export default async function ForgotPasswordPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto">
                <ForgotPasswordForm />
            </div>
        </div>
    );
}
