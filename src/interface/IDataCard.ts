interface ICard {
  id: number;
  title: string;
  color: string;
  description: string;
  custom: { deadline: string };
  users: number[];
  created_at: number;
}

export default ICard;
