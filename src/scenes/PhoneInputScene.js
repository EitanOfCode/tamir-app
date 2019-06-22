import React from 'react';
import { Container, Text, Card, Content, Form, Button } from 'native-base';
import { Alert } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import GlobalFont from 'react-native-global-font';
import { firebase } from '../utils/firebase/firebase-db';

class PhoneInputScene extends React.Component {
  componentDidMount() {
    this.phone.focus();
    const fontName = 'Assistant-Bold';
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <Form>
              <PhoneInput
                autoFormat
                allowZeroAfterCountryCode
                initialCountry="il"
                style={{
                  padding: 15
                }}
                ref={ref => {
                  this.phone = ref;
                }}
              />
            </Form>
          </Card>
          <Button
            style={styles.buttonTwoStyle}
            onPress={() => {
              firebase
                .auth()
                .signInWithEmailAndPassword('pass123456@test.com', '123456')
                .then(() => {
                  console.log('signed in with uid', firebase.auth().currentUser.uid);
                  this.props.navigation.navigate('MainScene');
                });
              return;
              // TODO replace with this for phone auth
              if (this.phone.isValidNumber()) {
                const phone = this.phone.getValue();
                // TODO: send request with phone (this.phone.getValue())
                firebase
                  .auth()
                  .signInWithPhoneNumber(phone)
                  .then(confirmResult => {
                    if (firebase.auth().currentUser) {
                      this.props.navigation.navigate('MainScene');
                    } else {
                      this.props.navigation.navigate('SmsCodeConfirmScene', { confirmResult });
                    }
                  })
                  .catch(error => console.log('error', error));
              } else {
                Alert.alert('Please enter a valid phone number ');
              }
            }}>
            <Text style={styles.textStyle}>Get Password By Sms</Text>
          </Button>
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
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    marginHorizontal: 80,
    marginBottom: 10,
    marginTop: 70
  },
  buttonTwoStyle: {
    alignSelf: 'stretch',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    marginHorizontal: 80,
    marginBottom: 10,
    marginTop: 35
  }
};
export { PhoneInputScene };
