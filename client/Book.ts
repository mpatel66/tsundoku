export default class Book {
  id!: string;
  isbn10!: string;
  isbn13!: string;
  authors!: string[];
  categories!: string[];
  description!: string;
  imageLinks!: ImageLinks;
  pageCount!: number;
  title!: string;

  constructor(id: string, isbn10:string, isbn13: string, authors: string[], categories: string[], description: string, imageLinks: ImageLinks, pageCount: number, title:string) {
    this.id = id;
    this.isbn10 = isbn10;
    this.isbn13 = isbn13;
    this.authors = authors;
    this.categories = categories;
    this.description = description;
    this.imageLinks = imageLinks;
    this.pageCount = pageCount;
    this.title = title;
  }
  // industryIdentifiers[0].identifier
  static parseBook( data: any ): Book {
    const { volumeInfo } = data;
    const  industryIdentifiers = volumeInfo.industryIdentifiers;
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

    return new Book(data.id, isbn10, isbn13, volumeInfo.authors, volumeInfo.categories, volumeInfo.description, volumeInfo.imageLinks, volumeInfo.pageCount, volumeInfo.title)
  }
}

interface ImageLinks {
  thumbnail: string;
  smallThumbnail: string;
}