'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { setCurrencyCode, setLanguageCode } from './settings';

export async function updateCurrencyCode(code: string) {
    await setCurrencyCode(code);
    revalidateTag('cart');
    revalidatePath('/', 'layout');
}

export async function updateLanguageCode(code: string) {
    await setLanguageCode(code);
    revalidateTag('collections');
    revalidateTag('cart');
    revalidatePath('/', 'layout');
}
