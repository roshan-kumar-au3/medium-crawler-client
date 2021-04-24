import './App.css';
import { connect } from 'react-redux';
import Signin from './components/signin/Signin';
import errorActions from './actions/errorAction';
import { useEffect } from 'react';
import Crawler from './components/crawler/Crawler';
import Signup from './components/signup/Signup';

function App(props) {
  const { auth, error, resetError } = props;

  useEffect(() => {
    resetError();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
    {
      error.isSet && (
          <div className="alert alert-danger mt-5" role="alert">
            {error.message}
          </div>
      )
    }
    {
      auth.accountCreated && !auth.isLoading && !auth.isLoggedIn && (
        <div className="alert alert-success mt-5" role="alert">
          Admin account created successfully!
        </div>
      )
    }
    {
      auth.isLoading && (
        <div className="alert alert-primary mt-5" role="alert">
          Loading... Please Wait!
        </div>
      )
    }
    {
      !auth.isLoggedIn && auth.showLogin &&  <Signin /> 
    }
    {
      !auth.isLoggedIn && !auth.showLogin &&  <Signup /> 
    }
    {
      auth.isLoggedIn && !auth.isLoading && <Crawler />  
    }
    </div>
  );
}

const mapStateToProps = (state) => {
  const { auth, error } = state;
  return {
      auth,
      error
  }
};

const mapDispatchToProps = (dispatch) => ({
  resetError: () => { dispatch(errorActions.resetError()); }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
