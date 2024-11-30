

export interface User {
    name: string,
    email: string,
    id: string
}

export interface Device {
    deviceId: string;
    deviceName: string | null;
    vendorId: string | null;
    deviceLocation: string | null;
    deviceFillLevel: number;
    deviceDescription: string | null;
    claimableStatus: boolean;
    lastActionTimestamp: Date;
    deviceActiveStatus: boolean;
}