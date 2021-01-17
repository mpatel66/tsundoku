import { useContext } from 'react';
import { useQuery } from 'react-query';
import AppContext from '../components/context/context';
import { fetchByAuthor, fetchBySearch, fetchByTitle } from '../service/APIService';
import Books from '../types/Book';
import { QueryEnum } from '../types/SearchTypes';


export default function debouncedQuery (queryString:string, queryType: QueryEnum) {
  const {state} = useContext(AppContext);
  // console.log('type', queryType);
  const removeDuplicates = (data: Books[]) => {
    return data.map((item: Books) => {
      const index = state.addedBooks.findIndex(addedBook => addedBook.id === item.id);
      if (index > - 1) return item = state.addedBooks[index];
      return item; 
    });
  };

  if (queryType === QueryEnum.Author) {
    console.log('author');
    return useQuery(['search','author', queryString], 
      () => fetchByAuthor(queryString), {
        enabled: !!queryString,
        select: (data) => removeDuplicates(data),
      });
  }
  else if (queryType === QueryEnum.Title) {
    console.log('title');
    return useQuery(['search', 'title', queryString], 
      () => fetchByTitle(queryString), {
        enabled: !!queryString,
        select: (data) => removeDuplicates(data),
      });
  }
  else {
    console.log('all');
    return useQuery(['search', queryString], 
      () => fetchBySearch(queryString), {
        enabled: !!queryString,
        select: (data) => removeDuplicates(data),
      });
  }
}