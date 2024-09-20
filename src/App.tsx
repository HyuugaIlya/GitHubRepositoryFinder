import { useState } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'
import {
  TQuery,
  TRepositories,
  useGetRepositoriesQuery
} from './store'

import { Header } from './components/Header/Header'
import { Content } from './components/Content/Content'
import { Footer } from './components/Footer/Footer'

import styles from './App.module.scss'

function App() {
  const [params, setParams] = useState<TQuery | null>(null)

  const { data: repsData = {
    data: {
      search: {}
    }
  } as TRepositories,
    isSuccess,
    isFetching
  } = useGetRepositoriesQuery(params ?? skipToken)

  const {
    edges,
    pageInfo,
    repositoryCount
  } = repsData.data.search

  return (
    <div className={styles.wrapper}>
      <Header setParams={setParams} />
      <Content
        reps={edges}
        isResult={isSuccess}
        isFetching={isFetching}
        repositoryCount={repositoryCount}
        setParams={setParams}
        pageInfo={pageInfo}
        limit={params?.first || 10}
      />
      <Footer />
    </div>
  )
}

export default App
