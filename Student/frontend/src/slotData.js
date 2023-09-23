import React from 'react';
import {useUser} from '@realm/react';

function QueryCourses() {
  // Get currently logged in user
  const user = useUser();
  const getCourseByName = async (name) => {
    // Access linked MongoDB collection
    const mongodb = user.mongoClient('mongodb-atlas');
    const plants = mongodb.db('intellicourseDB').collection('courses');
    // Query the collection
    // const response = await plants.findOne({name});
    const response = await courses.find({});
    return response;
  };
}

export default QueryCourses;
