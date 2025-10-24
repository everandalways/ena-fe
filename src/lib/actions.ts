'use server';

import {revalidatePath, updateTag} from 'next/cache';
import {setCurrencyCode} from './settings';

export async function updateCurrencyCode(code: string) {
    await setCurrencyCode(code);
    updateTag('cart');
    revalidatePath('/', 'layout');
}
