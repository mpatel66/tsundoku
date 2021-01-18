//TODO remove any unused fields.
export interface Book {
  id: string;
  status: StatusType;
  volumeInfo: VolumeInfo;
}

interface ImageLinks {
  thumbnail: string;
  smallThumbnail: string;
}

interface VolumeInfo {
  authors: string[];
  categories: string[];
  description: string;
  imageLinks: ImageLinks;
  pageCount: number;
  title: string;
}

export enum StatusType {
  ADDED = 'Added',
  NONE = 'Not Added',
  READING = 'Reading',
  READ ='Read',
  INCOMPLETE ='Unfinished'
}

export enum RatingType {
  NONE = 'Add Rating',
  LIKE = 'Like',
  LOVE = 'Love',
  HATE = 'Hate',
}

export interface ReadingBook extends Book {
  // startDate: string;
  startDate: moment.Moment;
  rating: RatingType;
}

export interface ReadBook extends ReadingBook {
  // endDate: string;
  endDate: moment.Moment;
}

export function isBook (book: Books): book is Book {
  return (book as ReadingBook).startDate === undefined;
}

export function isReadingBook (book: Books): book is ReadingBook {
  return (book as ReadingBook).startDate !== undefined; 
}

export function isReadBook (book: Book | ReadBook): book is ReadBook {
  return (book as ReadBook).endDate !== undefined;
}

type Books = Book | ReadingBook | ReadBook;
export default Books;

