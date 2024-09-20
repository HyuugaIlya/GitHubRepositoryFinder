// import { useEffect } from 'react'

// import { useDispatch, useSelector } from 'react-redux'
// import { AppDispatch } from './store'

// import {
//   getRepositories,
//   getRepositoriesSelector
// } from './store/slices/repositoriesSlice'

import { Header } from './components/Header/Header'
import { Content } from './components/Content/Content'
import { Footer } from './components/Footer/Footer'

import styles from './App.module.scss'

function App() {
  // const {
  //   repositories,
  //   fetchStatus
  // } = useSelector(getRepositoriesSelector)

  // const dispatch = useDispatch<AppDispatch>()
  // useEffect(() => {
  //   dispatch(getRepositories({ query: 'arr' }))
  // }, [dispatch])

  // console.log(repositories)

  return (
    <div className={styles.wrapper}>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default App
