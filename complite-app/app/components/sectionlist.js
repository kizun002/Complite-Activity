import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { deleteSection } from '@/utils/database';

const Section = ({section}) => {

    const deleteSec = async () => {
        try {
            const del = await deleteSection(section.sectionID);
            if (del.success){
                Alert.alert('Success', del.message);
            } else {
                Alert.alert('Error', del.message);
            }
        } catch (error) {
            conseole.log(error);
        }   
    }

    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text>{section.sectionName}</Text>
                <Text>{section.sectionCode}</Text>
                <Text>{section.sectionID}</Text>
                <Text>{section.dateTime}</Text>
                <TouchableOpacity onPress={deleteSec} style={styles.removeButton}>
                    <Text style={{color: 'white'}}>Remove Section</Text>
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

export default Section;
