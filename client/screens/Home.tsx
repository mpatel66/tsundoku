import React from 'react';
import { SafeAreaView } from 'react-native';
import { InfiniteQueryObserverResult, useInfiniteQuery, useQueryClient } from 'react-query';
import DiscoverList from '../components/container/Home/DiscoverList';
import generateNextPage from '../queries/generateNextPage';
import { fetchByCategoryPaginated } from '../service/APIService';
const categories = ['science', 'fantasy', 'fiction'];


const Home: React.FC = ()  => {
  const queryClient = useQueryClient();
  const genreName = categories[0];
  // const [currentItem, setCurrentItem] = useState(0);

  const {data, isSuccess, fetchNextPage }: InfiniteQueryObserverResult<any> = useInfiniteQuery(['categories', genreName], ({ pageParam = 0 }) => fetchByCategoryPaginated(pageParam, genreName), {
  });

  function getNextPage () {
    generateNextPage(data, fetchNextPage);
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