import React, { useState } from 'react'
import { connect } from 'react-redux';
import authActions from '../../actions/authAction';
import errorActions from '../../actions/errorAction';

function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { resetError, auth } = props;

    const handleLoginAdmin = (e) => {
        const { loginAdmin } = props;
        e.preventDefault();
        console.log({ email, password });
        loginAdmin(email, password);
    }

    const handleToggle = (e) => {
        const { toggleForm } = props;
        toggleForm();
    }


    return (
        <div className="row">
            <div className="col-10 col-sm-8 col-md-8 col-lg-6 col-xl-6 mx-auto mt-5">
                <h3 className="text-right mt-5 mb-5">Welcome to Medium Crawler</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                        onChange={(e) => { setEmail(e.target.value); resetError(); } } 
                        required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" 
                        onChange={(e) => { setPassword(e.target.value); resetError(); }}
                        />
                    </div>
                    <button type="submit" disabled={auth.isLoading} className="btn btn-primary btn-lg mr-3" onClick={handleLoginAdmin}>Submit</button>
                    <button type="button" className="btn btn-light btn-lg" onClick={handleToggle}>Signup</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth,
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginAdmin: (email, password) => { dispatch(authActions.loginAdmin(email, password)); },
    resetError: () => { dispatch(errorActions.resetError()); },
    toggleForm: () => { dispatch(authActions.toggleLoginForm()); },
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
