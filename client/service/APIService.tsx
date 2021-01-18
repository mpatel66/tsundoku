import Books, { StatusType } from '../types/Book';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const fieldMask = 'id,volumeInfo(title,authors,description,pageCount,categories,imageLinks)';

function filterDuplicates (array: Books[]) {
  return array
    .reduce( (acc: Books[], book:Books ) => {
      if (!!book.volumeInfo.imageLinks && !acc.find((item:{id:string}) => item.id === book.id)) {
        if (book.volumeInfo.authors === undefined) {
          book.volumeInfo.authors = ['Anon.'];
        }
        if ( book.volumeInfo.categories === undefined) {
          book.volumeInfo.categories = ['None'];
        }
        acc.push(
          {...book,
            status: StatusType.NONE
          });
      }
      return acc;
    }, []);
}

async function fetchFactory (search:string, results: number, removeDuplicates: boolean, page?:number, queryType?:string, order?:string, ) {
  const query = queryType ? `${queryType}:${search}` : search;
  const orderBy = !order ? 'relevance' : order;
  const pageParam = !page ? 0 : page;
  try {
    const response = await fetch(`${BASE_URL}?orderBy=${orderBy}&langRestrict=en&fields=items(${fieldMask})&q=${query}&startIndex=${pageParam}&maxResults=${results}`);
    if (response.status < 400) {
      const data = await response.json();
      if (data.items && removeDuplicates) return filterDuplicates(data.items);
      if (data.items && !removeDuplicates) return data.items;
      else return [];
    } else Promise.reject(response);
  } catch (e) {
    console.log(e);
  }
}

export async function fetchByCategoryPaginated (pageParam:number, subject:string) : Promise<Books[] | undefined> {
  try {
    return await fetchFactory(subject, 10, false, pageParam, 'subject', 'newest');
  } catch (e) {
    console.log(e);
  }
}

export async function fetchBySearch (searchTerm: string): Promise<Books[] | undefined> {
  try {
    return await fetchFactory(searchTerm, 40, true);
  } catch (e) {
    console.log(e);
  }
}


export async function fetchByAuthor (searchTerm: string) :Promise<Books[] | undefined> {
  try {
    return await fetchFactory(searchTerm, 40, true, 0, 'inauthor');
  } catch (e) {
    console.log(e);
  }
}

export async function fetchByTitle (searchTerm: string): Promise<Books[] | undefined> {
  try {
    return await fetchFactory(searchTerm, 40, true, 0, 'intitle');
  } catch (e) {
    console.log(e);
  }
}
