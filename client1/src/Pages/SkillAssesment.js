import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestSkill from '../Components/TestSkill';
import "../Resources/Stylesheets/skillAssesment.css";

function SkillAssesment() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(0);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/assessSkills');
      const fetchedSkills = response.data;
      setSkills(fetchedSkills);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSkill = {
      name: name,
      level: level
    };

    try {
      await axios.post('http://localhost:5000/api/user/add', newSkill);
      setName('');
      setLevel(0);
      fetchSkills(); // Fetch the updated skills after adding a new skill
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <div className='myskills'>
      <h3 className='myHeading'>Take Skills Assesment Test</h3>
      <TestSkill />
      <h3 className='myHeading'>Skill Assessment Score</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            required
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Score: </label>
          <input
            type="number"
            required
            className="form-control"
            value={level}
            onChange={e => setLevel(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Add Skill"
            className="btn btn-primary"
          />
        </div>
      </form>
      <div>
        <h3 className='heading2'>Skills List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Score</th>
             
            </tr>
          </thead>
          <tbody>
            {skills.map(skill => (
              <tr key={skill._id}>
                <td>{skill.name}</td>
                <td>{skill.level}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SkillAssesment;
