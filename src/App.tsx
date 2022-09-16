import { Suspense } from 'react'
import Router from 'routers/Router'
import Loading from 'components/Loading'
import { Provider } from 'react-redux'
import { store } from 'store'
import MessageProvider from 'providers/MessageProvider'

function App() {
	return (
		<Provider store={store}>
			<Suspense fallback={<Loading />}>
				<MessageProvider />
				<Router />
			</Suspense>
		</Provider>
	)
}

export default App
