import { useContext } from 'react';
import { InfiniteData, InfiniteQueryObserverResult, useInfiniteQuery } from 'react-query';
import AppContext from '../components/context/context';
import { fetchByCategoryPaginated } from '../service/APIService';
import Books, { StatusType } from '../types/Book';


export default function catgeoryQuery (category: string):InfiniteQueryObserverResult<Books[] | undefined, unknown> {
  const {state} = useContext(AppContext);
  return useInfiniteQuery(['categories', category], ({ pageParam = 0 }) => fetchByCategoryPaginated(pageParam, category), {
    select: (data) => {
      if (data !== undefined && data.pages !== undefined) {
        const flattenedPages = data.pages.flat() as Books[];
        const flattened = removeDuplicates(state.addedBooks,flattenedPages);
        return {pageParams: data.pageParams, pages: [flattened]} as InfiniteData<Books[] | undefined>;
      }
      else return data;
    }
  });
}


function removeDuplicates (addedBooks: Books[], array: Books[]): Books[] {

  const flattened = array.reduce((acc: Books[], book:Books) => {
    if (!!book.volumeInfo.imageLinks && !acc.find((item:{id:string}) => item.id === book.id)) {
      if (book.volumeInfo.authors === undefined) {
        book.volumeInfo.authors = ['Anon.'];
      }
      if ( book.volumeInfo.categories === undefined) {
        book.volumeInfo.categories = ['None'];
      }
      const findBook = addedBooks.findIndex(item => item.id === book.id);
      if (findBook > -1) acc.push(addedBooks[findBook]);
      else acc.push({...book,
        status: StatusType.NONE
      });
    }
    return acc;
  },[]);
  
  return flattened;
}