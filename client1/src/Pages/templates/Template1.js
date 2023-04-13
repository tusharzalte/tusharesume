import React from "react";
import "../../Resources/Stylesheets/templates.css";

function Template1() {
  const user = JSON.parse(localStorage.getItem("tusharresume-users"));
  
  return (
    <div className="templateParent">
      <div className="top d-flex flex-column">
        <div className="top d-flex flex-row justify-content-around">
          <h1>
            {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
          </h1>
        </div>
        <div className="top d-flex flex-row justify-content-around">
          <p>{user.email}</p>
          <p>{user.mobileNumber}</p>
          <p>{user.address}</p>
          <a href={user.linkedIn}>
            <p>LinkedIn</p>
          </a>
          <a href={user.github}>
            <p>Github</p>
          </a>
          <a href={user.portfolio}>
            <p>Portfolio</p>
          </a>
        </div>
      </div>

      <div className="divider mt-3"></div>

      <div className="education mt-3">
        <h3>Education</h3>

        {user.education.map((education) => {
          return (
            <div className="d-flex align-items-center">
              <h6 style={{ width: 120 }}>
                <b>{education.yearRange} : </b>
              </h6>
              <p>
                <b>{education.qualification}</b> with{" "}
                <b>{education.percentage}%</b> in {education.institution}
              </p>
            </div>
          );
        })}
      </div>

      <div className="divider mt-3"></div>

      <div className="experience mt-3">
        <h3>Experience</h3>

        {user.experience.map((experience) => {
          return (
            <div className="d-flex flex-column mt-2">
              <h6>
                <b className="top d-flex flex-row justify-content-between">
                  <p>
                    {experience.company} ({experience.place})
                  </p>
                  <p>{experience.yearRange}</p>
                </b>
              </h6>
              <h6>{experience.position}</h6>
              <div>{experience.description}</div>
            </div>
          );
        })}
      </div>

      <div className="divider mt-3"></div>

      <div className="projects mt-3">
        <h3>Projects</h3>
        {user.projects.map((project) => {
          return (
            <div className="d-flex flex-column mt-3">
              <h6>
                <b className="top d-flex flex-row justify-content-between">
                  <a href={project.link}>
                    <p>{project.title}</p>
                  </a>
                  <p>{project.yearRange}</p>
                </b>
              </h6>
              <div>{project.description}</div>
            </div>
          );
        })}
      </div>

      <div className="divider mt-3"></div>

      <div className="skills mt-3">
        <h3>Skills</h3>
        <div className="top d-flex flex-row justify-content-between">
          {user.skills.map((skill) => {
            return <p>{skill.technology}</p>;
          })}
        </div>
      </div>

      <div className="divider mt-3"></div>

      <div className="achievements mt-3">
        <h3>Achievements</h3>

        {user.achievements.map((achievement) => {
          return (
            <div className="d-flex flex-column mt-3">
              <h6>
                <b className="top d-flex flex-row justify-content-between">
                  <p>{achievement.title}</p>
                  <p>{achievement.yearRange}</p>
                </b>
              </h6>
              <div>{achievement.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Template1;
