export interface Device {
  id: string;
  deviceName: string | null;
  vendorId: string | null;
  deviceLocation: string | null;
  deviceFillLevel: number;
  deviceDescription: string | null;
  claimableStatus: boolean;
  lastActionTimestamp: Date;
  deviceActiveStatus: boolean;
}
