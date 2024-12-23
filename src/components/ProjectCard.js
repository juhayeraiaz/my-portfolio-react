import React from 'react';

const ProjectCard = (project) => {
  const { title, img, description, siteLink, codeLink } = project;

  console.log(project)
  return (
    <div>
      <div className="proj-imgbx">
        <img src={img} style={{ height: "180px" }} alt="" />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
          <br />
          <div className="project-url-container">
            <a className="project-url" href={siteLink} target="_blank" rel="noopener noreferrer">Visit Site</a>
            <a className="project-url" href={codeLink} target="_blank" rel="noopener noreferrer">Source Code</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;