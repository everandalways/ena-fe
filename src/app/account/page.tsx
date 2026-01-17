import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function AccountPage({
    searchParams,
}: PageProps<'/account'>) {
    const params = await searchParams;

    // If OAuth success, revalidate to ensure user data is fresh
    if (params.oauth === 'success') {
        revalidatePath('/', 'layout');
    }

    // Redirect to profile page as the default account page
    redirect('/account/profile');
}
