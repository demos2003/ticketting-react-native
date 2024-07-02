import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GreenCheck from '@/assets/icons/GreenCheck';
import EyeClosed from '@/assets/icons/EyeClosed';
import EyeOpen from '@/assets/icons/EyeOpen';

interface PasswordProps {
  value: string;
  onChangeText: (text: string) => void;
}

const PasswordInput: React.FC<PasswordProps> = ({ value, onChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (text: string) => {
    onChangeText(text); // Propagate changes back to parent component
    validatePassword(text);
  };

  const validatePassword = (password: string) => {
    // Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    setIsValid(passwordRegex.test(password));
  };

  return (
    <View style={styles.passwordInputContainer}>
      <View style={styles.containerLeft}>
        <Text style={{ color: 'rgba(0, 0, 0, 1)', fontSize: 7.09, fontWeight: '400' }}>Password*</Text>
        <TextInput
          value={value}
          onChangeText={handlePasswordChange}
          placeholder='*************'
          placeholderTextColor='rgba(51, 51, 51, 1)'
          secureTextEntry={!showPassword}
        />
      </View>
      <View style={isValid ? styles.containerRight : styles.emptycontainer}>
        {value.length > 0 ? ( <GreenCheck isValid={isValid}/>) : null}
        <TouchableOpacity onPress={togglePasswordVisibility} style={isValid ? null : {marginLeft:20}}>
          {showPassword ? <EyeClosed /> : <EyeOpen />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  passwordInputContainer: {
    height: hp((61 / 812) * 100),
    borderRadius: 5,
    paddingHorizontal: wp((12 / 370) * 100),
    borderColor: 'rgba(203, 203, 203, 1)',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18.66,
  },
  containerLeft: {
    width: '80%',
  },
  containerRight: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptycontainer:{
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:"flex-end",
    alignItems: 'center',
  }

});
