export interface IToken {
  currency: string;
  date: string;
  price: number;
}


export interface ISelectedToken{
  selectedToken: IToken
}