export interface ShortWorld {
  id: number;
  name: string;
  description: string;
}

export interface World extends ShortWorld {
  imaheId?: number;
  wiki?: Wiki[];
}

export interface Wiki {
  id: number;
  name: number;
  pages: WikiPage[];
}

export interface WikiPage {
  id: number;
  header: string;
  text: string;
  imageId?: number;
}
