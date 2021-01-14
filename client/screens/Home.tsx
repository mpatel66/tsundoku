import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native';
import { InfiniteQueryObserverResult, useInfiniteQuery, useQueryClient } from 'react-query';
import Book, {StatusType} from '../Book';
import DiscoverList from '../components/container/DiscoverList';
import AppContext from '../components/context/context';
import { fetchByCategoryPaginated } from '../service/APIService';
const categories = ['science', 'fantasy', 'fiction']


const Home: React.FC = ()  => {
  const queryClient = useQueryClient();
  const {state} = useContext(AppContext)
  const genreName = categories[1];

  const {data, isSuccess, fetchNextPage}: InfiniteQueryObserverResult<any> = useInfiniteQuery(['categories', genreName], ({ pageParam = 0 }) => fetchByCategoryPaginated(pageParam, genreName), {
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })

  const getNextPage = async () => {
    let currentItems: any; // since data.pageParams could be type unknown, have set this to any for now.
    if (data?.pageParams !== undefined) {
      // const pages: number[] = data.pageParams.shift()
      if (data.pageParams.length === 1) {
        currentItems = 9; // indexing on google starts from 0, so this represents 10 items.
        }
      else {
        currentItems = data.pageParams[data.pageParams.length-1];
      }
    }
    return await fetchNextPage({pageParam: currentItems+10}) // startIndex should increase by 10 as we start at index 0.
    }
    return (
      <SafeAreaView>
      {isSuccess && data &&
        <DiscoverList 
          books={data.pages.flat()} 
          getNextPage={getNextPage}
        />}
      </SafeAreaView>
    )

}

export default Home;