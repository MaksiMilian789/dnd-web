export interface Results {
  efficiency: number;
  workability: number;
  sustainability: number;
}

export interface httpResults extends Results {
  login: string;
  time: number;
  mistakes: number;
  date: Date;
}
