import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { unenroll } from '@/utils/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const enrolledSection = ({section}) => {

    const removeSection = async () => {
        try {
            const studid = await AsyncStorage.getItem('studentId');
            const remove = await unenroll(studid, section.enrollID);
            if (remove.success){
                Alert.alert('Success', remove.message);
            } else {
                Alert.alert('Error', remove.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.sectionName}>{section.sectionName}</Text>
                <Text style={styles.sectionName}>{section.firstName} {section.middleName} {section.lastName}</Text>
                <Text style={styles.dateTime}>{section.dateTime}</Text>
                <TouchableOpacity onPress={removeSection} style={styles.removeButton}>
                    <Text style={{color: 'white'}}>Unenroll Section</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F4F6',
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 2,
        shadowColor: '#232946',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      contentContainer: {
        padding: 16,
      },
      sectionName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#232946',
        marginBottom: 4,
      },
      sectionCode: {
        fontSize: 14,
        color: '#232946',
        opacity: 0.8,
        marginBottom: 4,
      },
      sectionId: {
        fontSize: 14,
        color: '#232946',
        opacity: 0.7,
        marginBottom: 4,
      },
      dateTime: {
        fontSize: 12,
        color: '#232946',
        opacity: 0.6,
      },
      removeButton: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        marginVertical: 10,
      }
});

export default enrolledSection;
