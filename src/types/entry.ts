export interface BottleEntry {
  id: string;
  personName: string;
  bottleCount: number;
  createdAt: Date;
  submittedAt: Date | null;
  status: 'pending' | 'submitted';
}
