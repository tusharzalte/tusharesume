import React from "react";
import "../../Resources/Stylesheets/templates.css";

function Template3() {
  const user = JSON.parse(localStorage.getItem("tusharresume-users"));
  
  return (
    <div className="template3Parent">
      <div className="header">
        <h1 className="name">
          {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
        </h1>
        <div className="contact-info">
          <p className="email">{user.email}</p>
          <p className="phone">{user.mobileNumber}</p>
          <p className="address">{user.address}</p>
        </div>
        <div className="social-links">
          <a className="social-link" href={user.linkedIn}>
            LinkedIn
          </a>
          <a className="social-link" href={user.github}>
            Github
          </a>
          <a className="social-link" href={user.portfolio}>
            Portfolio
          </a>
        </div>
      </div>

      <div className="divider"></div>

      <div className="education">
        <h3 className="section-heading">Education</h3>

        {user.education.map((education) => (
          <div className="education-item" key={education.institution}>
            <h6 className="year">{education.yearRange}</h6>
            <p className="qualification">{education.qualification}</p>
            <p className="institution">{education.institution}</p>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      <div className="experience">
        <h3 className="section-heading">Experience</h3>

        {user.experience.map((experience) => (
          <div className="experience-item" key={experience.company}>
            <h6 className="company">{experience.company}</h6>
            <p className="place">{experience.place}</p>
            <p className="year">{experience.yearRange}</p>
            <p className="position">{experience.position}</p>
            <p className="description">{experience.description}</p>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      <div className="projects">
        <h3 className="section-heading">Projects</h3>

        {user.projects.map((project) => (
          <div className="project-item" key={project.title}>
            <a className="project-title" href={project.link}>
              {project.title}
            </a>
            <p className="year">{project.yearRange}</p>
            <p className="description">{project.description}</p>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      <div className="skills">
        <h3 className="section-heading">Skills</h3>
        <div className="skill-list">
          {user.skills.map((skill) => (
            <p className="skill" key={skill.technology}>
              {skill.technology}
            </p>
          ))}
        </div>
      </div>

      <div className="divider"></div>

      <div className="achievements">
        <h3 className="section-heading">Achievements</h3>

        {user.achievements.map((achievement) => (
          <div className="achievement-item" key={achievement.title}>
            <p className="title">{achievement.title}</p>
            <p className="year">{achievement.yearRange}</p>
            <p className="description">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Template3;
