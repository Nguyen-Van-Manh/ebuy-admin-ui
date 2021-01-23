import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react'
import { client } from '../graphql/config';
import store, { persistor } from '../redux/store';
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HelmetProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </HelmetProvider>
  )
}

export default MyApp
