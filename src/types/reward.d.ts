export interface Reward {
  id: string;
  rewardName: string;
  rewardDescription: string;
  rewardPoints: number;
  rewardActiveStatus: boolean;
  redeemBy: string | null;
}
