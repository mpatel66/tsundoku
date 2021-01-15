import { Book } from "../types/Book";

const BASE_URL: string = 'https://www.googleapis.com/books/v1/volumes';
const fieldMask: string = 'id,volumeInfo(title,subtitle,authors,description,industryIdentifiers,pageCount,categories,imageLinks)';

export async function fetchByCategory (subject: string) {
  const response = await fetch(`${BASE_URL}?orderBy=newest&langRestrict=en&fields=items(${fieldMask})&q=subject:"${subject}"&maxResults=10`);
  if (response.status < 400) {
    const data = await response.json();
    const books = data.items.map((item: any) => Book.parseBook(item));
    return books;
  } else {
    Promise.reject(response);
  }
}


export async function fetchByCategoryPaginated(pageParam:number, subject:string) {
  const response = await fetch(`${BASE_URL}?orderBy=newest&langRestrict=en&fields=items(${fieldMask})&q=subject:"${subject}"&startIndex=${pageParam}&maxResults=10`);
  if (response.status < 400) {
    const data = await response.json();
    const googleBooks = data.items.filter((item: any) => !!item.volumeInfo.imageLinks).map((item: any) => Book.parseBook(item))
    return googleBooks;
  } else {
    Promise.reject(response);
  }
}