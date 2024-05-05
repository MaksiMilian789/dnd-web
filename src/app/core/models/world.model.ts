export interface ShortWorld {
  id: number;
  name: string;
  description: string;
}

export interface World extends ShortWorld {
  imaheId?: number;
}
