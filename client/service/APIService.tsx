import { Book } from "../types/Book";

const BASE_URL: string = 'https://www.googleapis.com/books/v1/volumes';
const fieldMask: string = 'id,volumeInfo(title,subtitle,authors,description,industryIdentifiers,pageCount,categories,imageLinks)';

function filterDuplicates (array:any) {
  return array
    .reduce( (acc: any, book:any ) => {
      if (!!book.volumeInfo.imageLinks && !acc.find((item:{id:string}) => item.id === book.id)) acc.push(Book.parseBook(book))
      return acc;
  }, [])
}

async function fetchFactory(search:string, results: number, page?:number, queryType?:string, order?:string) {
  const query = queryType ? `${queryType}:${search}` : search;
  const orderBy = !order ? 'relevance' : order;
  const pageParam = !page ? 0 : page;
  try {
    const response = await fetch(`${BASE_URL}?orderBy=${orderBy}&langRestrict=en&fields=items(${fieldMask})&q=${query}&startIndex=${pageParam}&maxResults=${results}`);
    if (response.status < 400) {
      const data = await response.json();
      return data.items ? filterDuplicates(data.items) : [];
    } else Promise.reject(response);
  } catch (e) {
    console.log(e);
  }
}


export async function fetchByCategoryPaginated(pageParam:number, subject:string) {
  try {
    return await fetchFactory(subject, 10, pageParam, 'subject', 'newest')
  } catch(e) {
    console.log(e)
  }
}

export async function fetchBySearch(searchTerm: string) {
  try {
    return await fetchFactory(searchTerm, 40);
  } catch (e) {
    console.log(e)
  }
}


export async function fetchByAuthor(searchTerm: string) {
  try {
    return await fetchFactory(searchTerm, 40, 0, 'inauthor');
  } catch (e) {
    console.log(e)
  }
}

export async function fetchByTitle(searchTerm: string) {
  try {
    return await fetchFactory(searchTerm, 40, 0, 'intitle');
  } catch (e) {
    console.log(e)
  }
}



// export async function fetchByCategory (subject: string) {
//   const response = await fetch(`${BASE_URL}?orderBy=newest&langRestrict=en&fields=items(${fieldMask})&q=subject:"${subject}"&maxResults=10`);
//   if (response.status < 400) {
//     const data = await response.json();
//     const books = data.items.map((item: any) => Book.parseBook(item));
//     return books;
//   } else {
//     Promise.reject(response);
//   }
// }