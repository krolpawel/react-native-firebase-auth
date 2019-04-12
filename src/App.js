import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = {
        loggedIn: null,
    };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: '', // insert your key here
            authDomain: 'rn-udemy-authentication.firebaseapp.com',
            databaseURL: 'https://rn-udemy-authentication.firebaseio.com',
            projectId: 'rn-udemy-authentication',
            storageBucket: 'rn-udemy-authentication.appspot.com',
            messagingSenderId: '' // insert your senderId here
          });

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
          });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return <Button onPress={() => firebase.auth().signOut()}> Log Out </Button>;
            case false:
                return <LoginForm />;
            default: return <Spinner size="large" />;
        }        
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" /> 
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
