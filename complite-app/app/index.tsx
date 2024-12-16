import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable, TouchableOpacity, Alert, Image, ActivityIndicator, Platform } from "react-native";
import { useState, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { loginUser } from '../utils/database.js';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notVisible, setNotVisible] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  //useEffect hook for running the checkingLoginStatus automatically without any action
  useEffect(() => {
    checkingLoginStatus();
  }, []);

  //checking the login status of the user
  const checkingLoginStatus = async () => {
    const stat = await AsyncStorage.getItem('isLoggedIn');
    const type = await AsyncStorage.getItem('account');
    if (stat === 'true'){
      setIsLoggedIn(true);
      if (type === 'Student'){
        router.replace('/(studTabs)/studDashboard');
      } else {
        router.replace('/(instructTabs)/instructDashboard');
      }
    } else {
      setIsLoggedIn(false);
      setPassword('');
      setUsername('');
    }
  }

  //handling Login Action
  const onLogin = async () => {
    try {
      setIsLoading(!isLoading); //enabling loading on press
      const response = await loginUser(username, password); //login api
      console.log(response);
      if (response.success){
        await AsyncStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        
        //Setting delay for 3 seconds - loading
        setTimeout(async () => {
          if (response.user.accountType == 'Student'){
            await AsyncStorage.setItem('accountId', JSON.stringify(response.user.id));
            await AsyncStorage.setItem('studentId', JSON.stringify(response.user.studentId));
            await AsyncStorage.setItem('account', JSON.stringify(response.user.accountType));
            router.replace('/(studTabs)/studDashboard');
          } else {
            await AsyncStorage.setItem('accountId', JSON.stringify(response.user.id));
            await AsyncStorage.setItem('instructorId', JSON.stringify(response.user.instructorId));
            await AsyncStorage.setItem('account', JSON.stringify(response.user.accountType));
            router.replace('/(instructTabs)/instructDashboard')
          }
        }, 1000);
      } else {
        setIsLoading(false);
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error: ');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>

      </View>
      <View style={styles.loginContainer}>
        <Text style={{
          color: '#232946', 
          textAlign: 'center', 
          fontSize: 32, fontWeight: 'bold',
          marginVertical: 10,
        }}>Login</Text>
        <TextInput style={styles.userInput} placeholder="Username" value={username} onChangeText={setUsername} />
        <View style={styles.passwordContainer}>
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={notVisible}/>
          <Pressable onPress={() => setNotVisible(!notVisible)}>
            <Ionicons name={notVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#E93023" />
          </Pressable>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          {isLoading && <ActivityIndicator /> }
          <Text>{isLoading ? 'Loading' : 'Login'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 2,
    backgroundColor: '#3EB183',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  userInput: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#E93023'
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#F5F4F6',
  },
  passwordContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#E93023'
  },
  loginButton: {
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: '#FCD200',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
        android: {
        elevation: 5,
        shadowColor: '#52006A',
      },
    })
  }
});