import React from 'react'
import { SafeAreaView } from 'react-native';
import { InfiniteQueryObserverResult, useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import DiscoverList from '../components/DiscoverList';
import { fetchByCategoryPaginated } from '../service/APIService';
const categories = ['science', 'fantasy', 'fiction']


const Home: React.FC = ()  => {
  const queryClient = useQueryClient();
  const genreName = categories[1];

  const {data, isSuccess, fetchNextPage, isFetchingNextPage}: InfiniteQueryObserverResult<any> = useInfiniteQuery(['categories', genreName], ({ pageParam = 0 }) => fetchByCategoryPaginated(pageParam, genreName), {
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })

  const getNextPage = async () => {
    // console.log(data?.pageParams)
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
      {isSuccess && <DiscoverList books={data && data.pages.flat()} getNextPage={getNextPage}/>}
      </SafeAreaView>
    )

}

export default Home;