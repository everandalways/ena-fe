import type {Metadata} from 'next';
import { RegistrationForm } from "./registration-form";

export const metadata: Metadata = {
    title: 'Create Account',
    description: 'Create a new account to start shopping with us.',
};

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-muted-foreground">
                        Sign up to start shopping with us
                    </p>
                </div>
                <RegistrationForm />
            </div>
        </div>
    );
}