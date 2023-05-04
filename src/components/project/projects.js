import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../utils/loading";
import { toFirstLetterUpperCase } from "../../utils/utilities";

const ProjectsComponent = () => {

    const [projects, setProjects] = useState({});

    useEffect(() => {

        const getAllProjects = async () => {
            await axios.get(`/projects`).then((response) => {
                setProjects(response.data);
            });
        }
        getAllProjects();
        
      }, []);

    return (
        <>
        {Object.keys(projects).length <= 0 ? 
        <Loading /> 

        : 
        
        <div id="projects" className='container'>
            <h1>{projects.length}</h1>
            <h2 className="mb-5">Projects on Ajokudi</h2>
            <div className="row">
                {projects.map((project, index) => {
                    return (
                        <div className="col-md-3 mb-5" key={index}>
                            <div className="project">
                                <Link to={`/project/dashboard/${project.project_code}`}><h3 className="text-secondary">
                                    {toFirstLetterUpperCase(project.project_name)}
                                </h3>
                                <span>By: Farin Gada</span>
                                <span>Target: {project.project_target}</span>
                                <span>Progress {project.project_target}</span></Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        }
        </>
    );
};

export default ProjectsComponent;
