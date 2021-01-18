import React from 'react';
import { Layout, Text  } from '@ui-kitten/components';
import { useQueryClient } from 'react-query';
import categoryQuery from '../../../queries/categoryQuery';
import DiscoverList from './DiscoverList';
import { DrawerLayoutAndroid } from 'react-native-gesture-handler';

interface Props {
  type: string;
}

const FictionList: React.FC<Props> = ({type}) => {
  const queryClient = useQueryClient();
  const {data, isSuccess, fetchNextPage } = categoryQuery(type);

  function getNextPage () {
    let nextPage: number;
    if (data?.pageParams !== undefined) {
      if (data.pageParams.length === 1) nextPage = 10; // indexing on google starts from 0, so next page starts at 10.
      else nextPage = 10 + (data.pageParams[data.pageParams.length-1] as number);
      fetchNextPage({pageParam: nextPage});
    }
  }

  return (
    <Layout>
      {isSuccess && data &&
      <DiscoverList 
        books={data.pages[0]} 
        getNextPage={getNextPage}
      />}
      {!isSuccess && <Text>It didnot work</Text>}
    </Layout>
  );
};


export default FictionList;
