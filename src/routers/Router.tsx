import { FC, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Routes } from './routes'
import Loading from 'components/Loading'


interface RouterProps { }

const Router: FC<RouterProps> = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
