export class Book {
  id!: string;
  isbn10!: string;
  isbn13!: string;
  authors!: string[];
  categories!: string[];
  description!: string;
  imageLinks!: ImageLinks;
  pageCount!: number;
  title!: string;
  status!: StatusType;

  constructor (id: string, isbn10:string, isbn13: string, authors: string[], categories: string[], description: string, imageLinks: ImageLinks, pageCount: number, title:string, status: StatusType) {
    this.id = id;
    this.isbn10 = isbn10;
    this.isbn13 = isbn13;
    this.authors = authors;
    this.categories = categories;
    this.description = description;
    this.imageLinks = imageLinks;
    this.pageCount = pageCount;
    this.title = title;
    this.status = status;
  }

  static parseBook ( data: any ): Book {
    const { volumeInfo } = data;
    const authors = volumeInfo.authors === undefined ? ['Anon.'] : volumeInfo.authors;
    const categories = volumeInfo.categories === undefined ? ['None.'] : volumeInfo.categories;
    const  industryIdentifiers = volumeInfo.industryIdentifiers;
    // const readDates = {startDate: undefined, endDate: undefined};
    let isbn10: string;
    let isbn13: string;

    if (industryIdentifiers) {
      isbn13 = industryIdentifiers[0] ? industryIdentifiers[0].identifier : 'None';
      isbn10 = industryIdentifiers[1] ? industryIdentifiers[1].identifier : 'None';
    }
    else {
      isbn10 = 'None';
      isbn13 = 'None';
    }

    return new Book(data.id, isbn10, isbn13, authors, categories, volumeInfo.description, volumeInfo.imageLinks, volumeInfo.pageCount, volumeInfo.title, StatusType.NONE);
  }
}

interface ImageLinks {
  thumbnail: string;
  smallThumbnail: string;
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
  startDate: Date;
  rating: RatingType;
}

export interface ReadBook extends ReadingBook {
  endDate: Date;
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