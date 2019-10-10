import React, { useEffect,lazy, suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up';
import CheckoutPage from './pages/checkout/checkout';
import Header from './components/header/header';
import ErrorBoundary from './components/error-boundary/error-boundary'

import { GlobalStyle } from './global.styles'; 

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';


const HomePage = lazy(() => import('/pages/homepage/homepage.component'));

const App =({checkUserSession, currentUser}) => {
  
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);   

  // render()
  return (
        <div>
        <GlobalStyle/>
        <Header/>
        <ErrorBoundary>
        <Suspense fallback= ''>
        <Switch>
         <Route exact path='/' component={ HomePage } />
         <Route path ='/shop' component={ ShopPage } />
         <Route exact path ='/checkout' component={ CheckoutPage } />
         <Route exact path='/signin'
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInSignUp />
              )
            }
          />
          </Suspense>
          </ErrorBoundar>
         </Switch>
        </div>
      );
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
