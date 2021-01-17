/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from 'react-query';

export default function generateNextPage (data:InfiniteData<any> | undefined, fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<any, unknown>>):void {
  let currentItems: number; // since data.pageParams could be type unknown, have set this to any for now.
  if (data?.pageParams !== undefined) {
    if (data.pageParams.length === 1) {
      currentItems = 0; // indexing on google starts from 0, so this represents 10 items.
    }
    else {
      currentItems = data.pageParams[data.pageParams.length-1] as number; //0,10,20,
    }
    const nextPage = currentItems + 10;
    fetchNextPage({pageParam: nextPage}); // startIndex should increase by 10 as we start at index 0.
  }
}