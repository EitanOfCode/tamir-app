import React from 'react';
import {
  Container,
  Content,
  Footer,
  Input,
  Label,
  Form,
  Item,
  Button,
  Spinner,
  Text
} from 'native-base';
import { Alert } from 'react-native';
import { firebase } from '../utils/firebase/firebase-db';
import { ignoreFirebaseLoadingWarnings } from '../utils/firebase/react-native-utils';

const INITIAL_STATE = { loading: false, code: '' };

class SmsCodeConfirmScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Confirmation code</Label>
              <Input
                autoFocus
                onChangeText={text => this.setState({ code: text })}
                value={this.state.code}
              />
            </Item>
            <Button
              style={[styles.buttonOneStyle, { alignSelf: 'center', marginTop: 40 }]}
              onPress={() => {
                if (this.state.code !== '') {
                  const { phone } = this.props.navigation.state.params;
                  this.setState({ loading: true });
                  ignoreFirebaseLoadingWarnings();
                  // TODO change to real phone auth
                  firebase
                    .auth()
                    .signInWithEmailAndPassword('pass123456@test.com', '123456')
                    .then(() => {
                      console.log('signed in with uid', firebase.auth().currentUser.uid);
                      this.props.navigation.navigate('MainScene');
                    })
                    .catch(error => {
                      Alert.alert('please check your connection');
                      this.setState({ loading: false, code: '' });
                    });
                } else {
                  Alert.alert('Please enter the given code');
                }
              }}>
              {this.state.loading ? <Spinner /> : <Text style={styles.textStyle}>Confirm</Text>}
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  buttonOneStyle: {
    width: 120,
    justifyContent: 'center'
  }
};
export { SmsCodeConfirmScene };
