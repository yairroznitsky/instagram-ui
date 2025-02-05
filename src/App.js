import './App.scss';
import Register from './Register/Register';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login/Login';
import { createContext, useEffect, useState } from 'react'
import Feed from './Feed/Feed';
import Header from './Header/Header';
import { me } from './services/user.service';
import PostCreate from './PostCreate/PostCreate';
import Profile from './Profile/Profile';
export const UserContext = createContext();

function App() {

    const history = useHistory();
    const [user, setUser] = useState({});

    useEffect(() => {
        me()
            .then(loggedUser => {
                if (!isLoggedIn(loggedUser)) {
                    history.push('/sign-in');
                    return;
                }
                setUser(loggedUser);
            })
            .catch(err => console.log(err));
    }, [history]);

    function isLoggedIn(user) {
        return user.hasOwnProperty('_id');
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <div className="App">
                {isLoggedIn(user) && <Header />}
                <Switch>
                    <Route path="/profile/:username">
                        <Profile />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/sign-in">
                        <Login />
                    </Route>
                    <Route path="/post/create">
                        <PostCreate />
                    </Route>
                    <Route exact path="/">
                        <Feed />
                    </Route>
                </Switch>
            </div>
        </UserContext.Provider>
    );
}

export default App;
