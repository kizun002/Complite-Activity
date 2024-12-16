import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://10.0.2.2:8000/api/login', {username, password}, );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getProfile = async (student_id) => {
    try {
        console.log(student_id);
        const response = await axios.post('http://10.0.2.2:8000/api/profile', student_id);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getInstructorProfile = async (instructor_id) => {
    try {
        console.log(instructor_id);
        const response = await axios.post('http://10.0.2.2:8000/api/instructorprofile', instructor_id);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getSectionDetails = async (instructorid) => {
    try {
        console.log(instructorid)
        const response = await axios.post('http://10.0.2.2:8000/api/sectionlist', instructorid);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const sendReport = async (account_id, report) => {
    try {
        const response = await axios.post('http://10.0.2.2:8000/api/sendreport', {account_id, report});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const addSection = async (instructor_id, course_name, course_description, activityname, sectionname, sectioncode, actduedate) => {
    try {
        const response = await axios.post('http://10.0.2.2:8000/api/addsection', {instructor_id, course_name, course_description, activityname, sectionname, sectioncode, actduedate});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getEnrollSection = async (student_id) => {
    try {
        const response = await axios.post('http://10.0.2.2:8000/api/enrolledsection', student_id);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const enrollToSection = async (sectionCode, student_id) => {
    try {
        console.log(sectionCode);
        const response = await axios.post('http://10.0.2.2:8000/api/enroll', {sectionCode, student_id});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateStudent = async (account_id, username, password) => {
    try {
        console.log(account_id);
        const response = await axios.post('http://10.0.2.2:8000/api/updatestudent', {account_id, username, password});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateInstructor = async (account_id, username, password) => {
    try {
        console.log(account_id);
        const response = await axios.post('http://10.0.2.2:8000/api/updateinstructor', {account_id, username, password});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const unenroll = async (student_id, enrollId) => {
    try {
        console.log(student_id, enrollId);
        const response = await axios.post('http://10.0.2.2:8000/api/unenroll', {student_id, enrollId});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteSection = async (section_id) => {
    try {
        console.log(section_id);
        const response = await axios.post('http://10.0.2.2:8000/api/remove', {section_id});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const pointing = async (student_id, points) => {
    try {
        console.log(student_id);
        const response = await axios.post('http://10.0.2.2:8000/api/record', {student_id, points});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export const fetchActivities = async () => {
    try {
      console.log('Attempting to fetch activities');
      
      const response = await axios.get('http://10.0.2.2:8000/api/activity', {
        
      });
  
      console.log('Raw response data:', JSON.stringify(response.data, null, 2));
  
      if (response.data.success) {
        const transformedActivities = response.data.activities.map((activity, index) => ({
          level: index + 1,
          questions: [{
            question: activity.activityQuestions,
            options: typeof activity.activityChoices === 'string' 
              ? JSON.parse(activity.activityChoices) 
              : activity.activityChoices,
            answer: activity.activityKey,
            picture: activity.activityPicture
          }]
        }));
  
        console.log('Transformed activities:', JSON.stringify(transformedActivities, null, 2));
  
        return {
          success: true,
          activities: transformedActivities
        };
      } else {
        console.error('API returned success: false');
        return {
          success: false,
          message: response.data.message || 'Failed to fetch activities'
        };
      }
    } catch (error) {
      console.error('Error in fetchActivities:', error);
      
      // Log more detailed error information
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
  
      return {
        success: false,
        message: error.message || 'Network error or server unavailable'
      };
    }
  };