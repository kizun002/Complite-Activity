import { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEnrollSection, enrollToSection } from "@/utils/database";
import EnrollSection from '../components/enrolledSectionList.js';
import Ionicons from '@expo/vector-icons/Ionicons';


const COLORS = {
  background: '#F5F4F6',    // White Smoke
  primary: '#FCD200',       // Gold
  accent: '#E93023',        // Chili Red
  warning: '#3EB183',       // Mint
  text: '#232946',          // Space Cadet
};

export default function studDashboard() {
  const [sections, setSections] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [secCode, setSecCode] = useState('');
    
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      enrolledSections();
    }, 2000);
  }, []);

  const enrolledSections = async () => {
    const studentid = await AsyncStorage.getItem('studentId');
    try {
      const enrolled = await getEnrollSection(studentid);
      console.log(enrolled);
      setSections(enrolled);
    } catch (error) {
      console.log(error);
    }
  }

  const enrollSection = async () => {
    try {
      const id = await AsyncStorage.getItem('studentId');
      const enroll = await enrollToSection(secCode, id);
      console.log(enroll);
      if (enroll.success){
        Alert.alert('Success', enroll.message);
      } else {
        Alert.alert('Error', enroll.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    enrolledSections();
  }, [])

  return (
    <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Section Enrolled</Text>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Ionicons name="add-circle" size={24} color={COLORS.primary} />
                    <Text style={styles.addButtonText}>Enroll</Text>
                </TouchableOpacity>
            </View>
      <FlatList
        data={sections}
        renderItem={({ item }) => <EnrollSection section={ item }/>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Modal 
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
            setIsModalVisible(!isModalVisible)
        }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)} style={styles.closeButton}>
                <Ionicons name="close-circle" size={24} color={COLORS.accent} />
              </TouchableOpacity>
                <Text style={styles.modalTitle}>Enroll Section</Text>
                <TextInput style={styles.input} editable value={secCode} onChangeText={setSecCode} placeholder='Section Code' />
                    
                <TouchableOpacity onPress={enrollSection} style={styles.submitButton}>
                  <Text>Enroll Section</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.text,
},
headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.background,
},
list: {
    flex: 1,
    padding: 16,
},
addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
},
addButtonText: {
    color: COLORS.text,
    marginLeft: 8,
    fontWeight: '600',
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
    maxWidth: 500,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    padding: 4,
},
input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    color: COLORS.text,
},
textArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 100,
    textAlignVertical: 'top',
    color: COLORS.text,
},
dateContainer: {
    marginVertical: 12,
},
dateLabel: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
},
dateValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
},
pickerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
},
pickerButton: {
    backgroundColor: COLORS.text,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
},
pickerButtonText: {
    color: COLORS.background,
    textAlign: 'center',
    fontWeight: '600',
},
submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
},
submitButtonText: {
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
},
});