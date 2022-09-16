import { Suspense } from 'react'
import Router from 'routers/Router'
import Loading from 'components/Loading'

function App() {
	return (
		<Suspense fallback={<Loading />}>
			<Router />
		</Suspense>
	)
}

export default App
