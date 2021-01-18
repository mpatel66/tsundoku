import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { InfiniteData, InfiniteQueryObserverResult, useInfiniteQuery, useQueryClient } from 'react-query';
import DiscoverList from '../components/container/Home/DiscoverList';
import AppContext from '../components/context/context';
import { fetchByCategoryPaginated } from '../service/APIService';
import Books, { Book } from '../types/Book';
const categories = ['fiction', 'fantasy', 'fiction'];


const Home: React.FC = ()  => {
  const queryClient = useQueryClient();
  const {state} = useContext(AppContext);
  const genreName = categories[0];

  // need to ensure status is correct.
  // {pageParams: [...], pages: [[book1, book2, ], [book3, book4] ]}
  const {data, isSuccess, fetchNextPage } = useInfiniteQuery(['categories', genreName], ({ pageParam = 0 }) => fetchByCategoryPaginated(pageParam, genreName), {
    select: (data) => {
      if (data !== undefined && data.pages !== undefined) {
        const flattened = data.pages.flat().map((item: Books) => {
          const findBook = item ? state.addedBooks.findIndex(book => book.id === item.id) : -1;
          if (findBook > -1) {
            return state.addedBooks[findBook];
          } else {
            return item;
          }
        });
        return {pageParams: data.pageParams, pages: [flattened]};
      }
      else return data;
    }
  });

  function getNextPage () {
    let nextPage: number;
    if (data?.pageParams !== undefined) {
      if (data.pageParams.length === 1) nextPage = 10; // indexing on google starts from 0, so next page starts at 10.
      else nextPage = 10 + (data.pageParams[data.pageParams.length-1] as number);
      fetchNextPage({pageParam: nextPage});
    }
  }
  return (
    <SafeAreaView>
      {isSuccess && data && 
        <DiscoverList 
          books={data.pages[0]} 
          getNextPage={getNextPage}
        />}
    </SafeAreaView>
  );

};

export default Home;