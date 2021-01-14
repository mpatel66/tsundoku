import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import Book from '../../../Book'

interface Props {
  book: Book;
}

const AddedBook: React.FC<Props> = ({book}) => {
  return (
    <Layout>
      <Text category='h2'>
        {book.title}
      </Text>
    </Layout>
  )
}

export default AddedBook;