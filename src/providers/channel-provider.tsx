'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ResultOf } from '@/graphql';
import type { GetActiveChannelQuery } from '@/lib/vendure/queries';

type Channel = NonNullable<ResultOf<typeof GetActiveChannelQuery>['activeChannel']>;

interface ChannelContextValue {
    channel: Channel;
    currencyCode: string;
    languageCode: string;
    setCurrencyCode: (code: string) => void;
    setLanguageCode: (code: string) => void;
}

const ChannelContext = createContext<ChannelContextValue | null>(null);

export function ChannelProvider({
    channel,
    initialCurrencyCode,
    initialLanguageCode,
    children,
}: {
    channel: Channel;
    initialCurrencyCode: string;
    initialLanguageCode: string;
    children: ReactNode;
}) {
    const [currencyCode, setCurrencyCode] = useState(initialCurrencyCode);
    const [languageCode, setLanguageCode] = useState(initialLanguageCode);

    return (
        <ChannelContext.Provider
            value={{
                channel,
                currencyCode,
                languageCode,
                setCurrencyCode,
                setLanguageCode,
            }}
        >
            {children}
        </ChannelContext.Provider>
    );
}

export function useChannel() {
    const context = useContext(ChannelContext);
    if (!context) {
        throw new Error('useChannel must be used within a ChannelProvider');
    }
    return context;
}
