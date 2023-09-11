export interface ITrade {
  id: number;
  status: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  logs: ILog[];
}

export interface ILog {
  id: number;
  status: number;
  context: string;
  result: boolean;
  createdAt: Date;
}
