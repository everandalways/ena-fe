'use client';

import { useChannel } from '@/providers/channel-provider';
import { updateLanguageCode } from '@/lib/actions';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useTransition } from 'react';

export function LanguagePicker() {
    const { channel, languageCode, setLanguageCode } = useChannel();
    const [isPending, startTransition] = useTransition();

    const handleLanguageChange = (code: string) => {
        setLanguageCode(code);
        startTransition(async () => {
            await updateLanguageCode(code);
        });
    };

    return (
        <Select
            value={languageCode}
            onValueChange={handleLanguageChange}
            disabled={isPending}
        >
            <SelectTrigger className="w-[100px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {channel.availableLanguageCodes.map((code) => (
                    <SelectItem key={code} value={code}>
                        {code.toUpperCase()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
