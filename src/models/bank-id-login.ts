export interface AuthResponse {
    orderRef: string;
    autoStartToken: string;
    qrStartToken: string;
    qrStartSecret: string;
}
export type OrderStatus = 'pending' | 'complete' | 'failed' | 'userSign';

export interface CompletionData {
    user: {
        personalNumber: string;
        name: string;
        givenName: string;
        surname: string;
    }
    device: {
        ipAddress: string;
        uhi: string;
    }
    bankIdIssueDate: string;
    signature: string;

}

export interface CollectResponse {
    orderRef: string;
    status: OrderStatus;
    completionData?: CompletionData;
    hintCode?: string;
}