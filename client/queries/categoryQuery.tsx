import { useContext } from 'react';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import AppContext from '../components/context/context';
import { fetchByCategoryPaginated } from '../service/APIService';
import Books from '../types/Book';


export default function catgeoryQuery (category: string) {
  const {state} = useContext(AppContext);
  return useInfiniteQuery(['categories', category], ({ pageParam = 0 }) => fetchByCategoryPaginated(pageParam, category), {
    select: (data) => {
      if (data !== undefined && data.pages !== undefined) {
        const flattened = data.pages.flat().map((item) => {
          const findBook = item ? state.addedBooks.findIndex(book => book.id === item.id) : -1;
          if (findBook > -1) {
            return state.addedBooks[findBook];
          } else {
            return item;
          }
        });
        return {pageParams: data.pageParams, pages: [flattened]} as InfiniteData<Books[] | undefined>;
      }
      else return data;
    }
  });
}


