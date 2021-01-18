import React from 'react';
import { SafeAreaView } from 'react-native';
import { InfiniteQueryObserverResult, useInfiniteQuery, useQueryClient } from 'react-query';
import DiscoverList from '../components/container/Home/DiscoverList';
import { fetchByCategoryPaginated } from '../service/APIService';
const categories = ['fiction', 'fantasy', 'fiction'];


const Home: React.FC = ()  => {
  const queryClient = useQueryClient();
  const genreName = categories[0];
  // const [currentItem, setCurrentItem] = useState(0);

  const {data, isSuccess, fetchNextPage }: InfiniteQueryObserverResult<any> = useInfiniteQuery(['categories', genreName], ({ pageParam = 0 }) => fetchByCategoryPaginated(pageParam, genreName), {
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
          books={data.pages.flat()} 
          getNextPage={getNextPage}
        />}
    </SafeAreaView>
  );

};

export default Home;