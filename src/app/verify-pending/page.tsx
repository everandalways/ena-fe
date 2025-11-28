import type {Metadata} from 'next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Verification Pending',
    description: 'Check your email to verify your account.',
};

export default function VerifyPendingPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6">
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex justify-center">
                            <CheckCircle className="h-16 w-16 text-green-600" />
                        </div>
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold">Check Your Email</h1>
                            <p className="text-muted-foreground">
                                We&apos;ve sent a verification link to your email address.
                                Please check your inbox and click the link to verify your account.
                            </p>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                            <p className="text-sm text-muted-foreground">
                                Don&apos;t see the email? Check your spam folder or request a new verification link.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                        <Link href="/sign-in" className="w-full">
                            <Button className="w-full">
                                Go to Sign In
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
