export class CreateCardDto {
  title: string;
  description?: string;

  creator: string;
  artist: string;

  colors: string[];
  costs: {
    color: string;
    amount: number;
  }[];

  primaryType: string;
  tribe?: string;
  rarity?: string;
  speed?: string;

  damage?: number;
  armor?: number;
  health?: number;

  artwork?: string;

  setId: string;
}
