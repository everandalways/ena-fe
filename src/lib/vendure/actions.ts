import {query} from './api';
import {GetActiveChannelQuery, GetActiveCustomerQuery} from './queries';

export async function getActiveCustomer() {
    const result = await query(GetActiveCustomerQuery, undefined, {useAuthToken: true});
    return result.data.activeCustomer;
}

export const getActiveChannel =
    async () => {
        const result = await query(GetActiveChannelQuery, undefined);
        return result.data.activeChannel;
    }
