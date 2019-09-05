/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../LandingPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';

import { useAuth0 } from '../Auth';

import GlobalStyle from '../../global-styles';
import LoadingIndicator from '../../components/LoadingIndicator';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  justify-content: center;
`;
const Center = styled.div`
  text-align: center;
`;
export default function App() {
  const { loading } = useAuth0();

  return (
    <AppWrapper>
      <Helmet titleTemplate="%s" defaultTitle="React.js Boilerplate">
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      {/* <Header /> */}
      {loading ? (
        <Center>
          <LoadingIndicator />
        </Center>
      ) : (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      )}
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}
