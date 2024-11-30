export class UpdateEventDto {
  readonly title: string;
  readonly description: string;
  readonly date: Date;
  readonly time: string;
  readonly address: {
    readonly venue: string;
    readonly location: string;
  };
  readonly price: number;
  readonly capacity: number;
  readonly imageUrl: string;
}
