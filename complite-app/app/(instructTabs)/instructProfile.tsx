import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, Image, Pressable, TextInput, Alert} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInstructorProfile, sendReport, updateInstructor } from '@/utils/database';
import Ionicons from '@expo/vector-icons/Ionicons';

const COLORS = {
  background: '#F5F4F6',    // White Smoke
  primary: '#FCD200',       // Gold
  accent: '#E93023',        // Chili Red
  warning: '#3EB183',       // Mint
  text: '#232946',          // Space Cadet
};

export default function instructProfile() {
    const [accId, setAccId] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [sex, setSex] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [report, setReport] = useState('');
    const [isEditable, setIsEditable] = useState(false);

    const instructorProfile = async () => {
        const instructId = await AsyncStorage.getItem('instructorId');
        try {
            const profile = await getInstructorProfile(instructId);
            console.log(profile);
            if (profile.success){
                setAccId(profile.instructor.accountid);
                setFirstname(profile.instructor.firstname);
                setLastname(profile.instructor.lastname);
                setMiddlename(profile.instructor.middlename);
                setSex(profile.instructor.sex);
                setEmail(profile.instructor.email);
                setBirthdate(profile.instructor.birthdate);
                setProfilePic(profile.instructor.profilePhoto);
            } else {
                Alert.alert('Error', profile.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editProfile = async () => {
      try {
        const instructid = await AsyncStorage.getItem('accountId');
        const update = await updateInstructor(instructid, username, password);
        if (update.success){
          Alert.alert("Success", update.message);
          setIsEditable(false);
          setUsername('');
          setPassword('');
        } else {
          Alert.alert("Error", update.message);
          setIsEditable(false);
          setUsername('');
          setPassword('');
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        instructorProfile();
    }, []);

    const sendTheReport = async () => {
        try {
          const feedback = await sendReport(accId, report);
          if (feedback.success){
            Alert.alert('Success', feedback.message);
            setReport('');
            setIsModalVisible(false);
          } else {
            Alert.alert('Error', feedback.message);
          }
        } catch (error) {
          console.log(error);
        }
    }

    const handleLogOut =  async () => {
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('accountId');
        await AsyncStorage.removeItem('instructorId');
        await AsyncStorage.removeItem('account');
        router.dismissTo('/');
    }

    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Profile</Text>
              <View style={styles.groupButtons}>
                  <Pressable style={styles.iconButton}>
                      <Ionicons name="notifications" size={24} color={COLORS.text} />
                  </Pressable>
                  <Pressable style={styles.iconButton} onPress={() => setIsModalVisible(true)}>
                      <Ionicons name="create-outline" size={24} color={COLORS.text} />
                  </Pressable>
              </View>
          </View>
      </View>
 
      <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                    {profilePic ? (
                        <Image source={{ uri: profilePic }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profileImagePlaceholder}>
                            <Ionicons name="person" size={60} color={COLORS.text} />
                        </View>
                    )}
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.nameText}>
                        {firstname} {middlename} {lastname}
                    </Text>
                    
                    <View style={styles.infoItem}>
                        <Ionicons name="mail-outline" size={20} color={COLORS.text} />
                        <Text style={styles.infoText}>{email}</Text>
                    </View>
                    
                    <View style={styles.infoItem}>
                        <Ionicons name="person-outline" size={20} color={COLORS.text} />
                        <Text style={styles.infoText}>{sex}</Text>
                    </View>
                    
                    <View style={styles.infoItem}>
                        <Ionicons name="calendar-outline" size={20} color={COLORS.text} />
                        <Text style={styles.infoText}>{birthdate}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
                <Ionicons name="log-out-outline" size={20} color={COLORS.background} />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Report Form</Text>
                            <TouchableOpacity 
                                style={styles.closeButton} 
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Ionicons name="close-circle" size={24} color={COLORS.accent} />
                            </TouchableOpacity>
                        </View>

                        <TextInput 
                            style={styles.modalInput}
                            editable={false} 
                            value={accId} 
                            placeholder={JSON.stringify({accId})}
                        />

                        <TextInput
                            style={styles.modalTextArea}
                            editable
                            multiline
                            numberOfLines={8}
                            maxLength={250}
                            placeholder="Your report"
                            value={report}
                            onChangeText={setReport}
                            placeholderTextColor="#666"
                        />

                        <TouchableOpacity 
                            style={styles.submitButton}
                            onPress={sendTheReport}
                        >
                            <Text style={styles.submitButtonText}>Send Report</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

      <TouchableOpacity style={styles.editButton} onPress={() => setIsEditable(!isEditable)}>
        <Text>Edit </Text>
      </TouchableOpacity>

      {isEditable && <TextInput style={styles.inputBox} value={username} onChangeText={setUsername} placeholder="Enter New Username" />}
      {isEditable && <TextInput style={styles.inputBox} value={password} onChangeText={setPassword} placeholder="Enter New Password" />}
      {isEditable && <TouchableOpacity onPress={editProfile} style={styles.updateButton} ><Text style={{color: COLORS.background}}>Update</Text></TouchableOpacity>}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Text>Logout</Text>
      </TouchableOpacity>

    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
},
header: {
    backgroundColor: COLORS.text,
    paddingTop: 20,
    paddingBottom: 20,
},
headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
},
headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.background,
},
groupButtons: {
    flexDirection: 'row',
    gap: 15,
},
iconButton: {
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
},
profileSection: {
    padding: 20,
    alignItems: 'center',
},
profileImageContainer: {
    marginBottom: 20,
},
profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.primary,
},
profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
},
infoContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
},
nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
},
infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
},
infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.text,
},
logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
},
logoutText: {
    color: COLORS.background,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
},
modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
},
modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
},
modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
},
modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
},
closeButton: {
    padding: 5,
},
modalInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
},
modalTextArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 150,
    textAlignVertical: 'top',
},
submitButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
},
submitButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
},
editButton: {
  marginVertical: 2.5,
  marginHorizontal: 20,
  backgroundColor: COLORS.primary,
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
},
inputBox: {
  borderWidth: 1,
  marginVertical: 5,
  marginHorizontal: 20,
},
updateButton:{
  marginVertical: 5,
  marginHorizontal: 20,
  backgroundColor: COLORS.text,
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
}
});