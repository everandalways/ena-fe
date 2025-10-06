'use client';

import { useChannel } from '@/providers/channel-provider';
import { updateCurrencyCode } from '@/lib/actions';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useTransition } from 'react';

export function CurrencyPicker() {
    const { channel, currencyCode, setCurrencyCode } = useChannel();
    const [isPending, startTransition] = useTransition();

    const handleCurrencyChange = (code: string) => {
        setCurrencyCode(code);
        startTransition(async () => {
            await updateCurrencyCode(code);
        });
    };

    return (
        <Select
            value={currencyCode}
            onValueChange={handleCurrencyChange}
            disabled={isPending}
        >
            <SelectTrigger className="w-[100px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {channel.availableCurrencyCodes.map((code) => (
                    <SelectItem key={code} value={code}>
                        {code}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
