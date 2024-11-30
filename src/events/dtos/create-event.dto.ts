export class CreateEventDto {
  title: string;
  description: string;
  date: Date;
  time: string;
  address: {
    venue: string;
    location: string;
  };
  price: number;
  capacity: number;
  imageUrl: string;
}
