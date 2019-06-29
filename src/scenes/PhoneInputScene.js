import React from 'react';
import { Platform, Alert } from 'react-native';
import { Container, Text, Card, Content, Form, Button } from 'native-base';

import PhoneInput from 'react-native-phone-input';
import GlobalFont from 'react-native-global-font';
import { firebase } from '../utils/firebase/firebase-db';

const format = phone =>
  phone
    .split(' ')
    .join('')
    .split('-')
    .join('');

class PhoneInputScene extends React.Component {
  constructor(props) {
    super(props);
    this.phone = React.createRef();
  }

  componentDidMount() {
    this.phone.focus();
    const fontName = 'Assistant-Bold';
    GlobalFont.applyGlobal(fontName);
  }

  signInWithPhone(phone) {
    console.log('eitan is logged in before', firebase.auth().currentUser);
    firebase
      .auth()
      .signInWithPhoneNumber(format(phone), true)
      .then(confirmResult => {
        // Alert.alert('Success confirmed', confirmResult);
        if (firebase.auth().currentUser) {
          this.props.navigation.navigate('MainScene');
        } else {
          this.props.navigation.navigate('SmsCodeConfirmScene', { confirmResult });
        }
      })
      .catch(error => {
        console.log('Phone auth error', error);
      });
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
                maxLength={14}
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
              // TODO replace with this for phone auth
              if (this.phone.isValidNumber()) {
                if (Platform.OS === 'ios') {
                  this.props.navigation.navigate('SmsCodeConfirmScene');
                } else this.signInWithPhone(this.phone.getValue());
              } else Alert.alert('Please enter a valid phone number');
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
    fontSize: 14,
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
