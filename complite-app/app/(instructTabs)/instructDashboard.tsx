import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Platform, Button, Alert, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getSectionDetails, addSection } from '@/utils/database';
import Section from '../components/sectionlist.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const COLORS = {
    background: '#F5F4F6',    // White Smoke
    primary: '#FCD200',       // Gold
    accent: '#E93023',        // Chili Red
    warning: '#3EB183',       // Mint
    text: '#232946',          // Space Cadet
};

export default function instructDashboard() {
    const [sections, setSections] = useState([]);
    const [sectionName, setSectionName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [activityName, setActivityName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [actDate, setActDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            getSections();
        }, 2000);
    }, []);

    const showPicker = (currentMode) => {
        setIsPickerShow(true);
        setMode(currentMode)
    };
    
      const onChange = (event, value) => {
        setActDate(value);
        if (Platform.OS === 'android') {
          setIsPickerShow(false);
        }
    };

    const getSections = async () => {
        try {
            const instructId = await AsyncStorage.getItem('instructorId');
            const secLists = await getSectionDetails(instructId);
            console.log(secLists);
            setSections(secLists);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSections();
    }, []);

    const createSection = async () => {
        const instructId = await AsyncStorage.getItem('instructorId');
        const code = generateRandomString(6);
        const newActDate = actDate.toISOString().split('T')[0];
        try {
            const add = await addSection(instructId, courseName, courseDescription, activityName, sectionName, code, newActDate);
            console.log(add);
            if (add.success) {
                Alert.alert('Success', add.message);
                setCourseName('');
                setActivityName('');
                setCourseDescription('');
                setSectionName('');
                setIsModalVisible(false);
                router.replace('/(instructTabs)/instructDashboard');
            } else {
                Alert.alert('Error', add.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Sections Dashboard</Text>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Ionicons name="add-circle" size={24} color={COLORS.primary} />
                    <Text style={styles.addButtonText}>Add Section</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                style={styles.list}
                data={sections}
                renderItem={({ item }) => <Section section={item} />}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add New Section</Text>
                            <TouchableOpacity 
                                onPress={() => setIsModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close-circle" size={24} color={COLORS.accent} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.input}
                            value={sectionName}
                            onChangeText={setSectionName}
                            placeholder="Section Name"
                            placeholderTextColor="#666"
                        />
                        <TextInput
                            style={styles.input}
                            value={courseName}
                            onChangeText={setCourseName}
                            placeholder="Course Name"
                            placeholderTextColor="#666"
                        />
                        <TextInput
                            style={styles.input}
                            value={activityName}
                            onChangeText={setActivityName}
                            placeholder="Activity Name"
                            placeholderTextColor="#666"
                        />
                        <TextInput
                            style={styles.textArea}
                            multiline
                            numberOfLines={4}
                            maxLength={250}
                            value={courseDescription}
                            onChangeText={setCourseDescription}
                            placeholder="Course Description"
                            placeholderTextColor="#666"
                        />

                        <View style={styles.dateContainer}>
                            <Text style={styles.dateLabel}>Selected Date:</Text>
                            <Text style={styles.dateValue}>
                                {actDate.toLocaleDateString()}
                            </Text>
                        </View>

                        <View style={styles.pickerButtons}>
                            {!isPickerShow && (
                                <>
                                    <TouchableOpacity
                                        style={[styles.pickerButton, { marginRight: 10 }]}
                                        onPress={() => showPicker('date')}
                                    >
                                        <Text style={styles.pickerButtonText}>Select Date</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.pickerButton}
                                        onPress={() => showPicker('time')}
                                    >
                                        <Text style={styles.pickerButtonText}>Select Time</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>

                        {isPickerShow && (
                            <DateTimePicker
                                value={actDate}
                                mode={mode}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24Hour={true}
                                onChange={onChange}
                            />
                        )}

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={createSection}
                        >
                            <Text style={styles.submitButtonText}>Create Section</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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