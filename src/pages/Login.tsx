import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form, Header, Container } from 'semantic-ui-react'
import { LoginErrMsg } from '../cmps/LoginErrMsg'
import { useHistory } from 'react-router-dom'
import { RootStoreContext } from '../stores/RootStore'
import { useForm, useMediaQuery } from '../services/customHooks'
import 'semantic-ui-css/semantic.min.css'


const Login: React.FC = observer(() => {
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore, systemStore } = rootStoreContext;
    const [credentials, handleChange, clearFildes] = useForm({ email: '', password: '', username: '' });
    const [isSignup, setIsSignup] = useState<boolean>(false);
    const isError = systemStore.isError.existingError;
    const { errorStatus } = systemStore.isError;

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    const mediaQuery = useMediaQuery('(min-width: 600px)')
    function determinFildesWidth() {
        if (mediaQuery) return 5;
        else return 10;
    }
    const router = useHistory()
    async function onLoginSignup() {
        try {

            if (!isSignup) await userStore.onlogin(credentials);
            else await userStore.onSignup(credentials);
            if (userStore.loggedInUser) router.push('/TodosApp');

        }
        catch {
            systemStore.onError();
            clearFildes();
        }
    }
    function onToggleSignup(): void {
        setIsSignup(!isSignup);
    }


    const formBtnContent: string = isSignup ? 'Sign up' : 'Login';
    const signupBtnContent: string = !isSignup ? 'Create an account!' : 'Switch to login ';
    const usernameFiled: JSX.Element = (<Form.Field width={determinFildesWidth()}>
        <label>Username</label>
        <input type="text" onChange={handleChange} name="username" placeholder="Enter user name" />
    </Form.Field>)

    return (
        <React.Fragment>
            <Container className="login-page">
                <Header textAlign="center" as="h1">Welcome to Todos App!</Header>
                {isError && <LoginErrMsg errorStatus={errorStatus} />}
                <Form onSubmit={onLoginSignup} style={formStyle}>
                    {isSignup && usernameFiled}
                    <Form.Field width={determinFildesWidth()}>
                        <label>Email</label>
                        <input type="email" onChange={handleChange} name="email" placeholder="Enter email" />
                    </Form.Field>
                    <Form.Field width={determinFildesWidth()}>
                        <label>Password</label>
                        <input type="password" onChange={handleChange} name="password" placeholder="Enter password" />
                    </Form.Field>
                    <Button type="submit">{formBtnContent}</Button>
                </Form>
                <Button className="switch-btn" onClick={onToggleSignup} content={signupBtnContent} basic />
            </Container>
        </React.Fragment>

    );
}
)
export default Login