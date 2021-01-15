import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import Book, { ReadBook } from '../../../Book'

interface Props {
  book: ReadBook;
}

const ReadBookItem: React.FC<Props> = ({book}) => {
  return (
    <Layout>
      <Text category='h2'>
        {book.title}
      </Text>
    </Layout>
  )
}

export default ReadBookItem;