import { redirect } from 'next/navigation';

export default function AccountPage() {
    // Redirect to profile page as the default account page
    redirect('/account/profile');
}
