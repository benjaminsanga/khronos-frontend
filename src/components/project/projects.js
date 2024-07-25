import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../utils/loading";
import { toFirstLetterUpperCase } from "../../utils/utilities";
import {useGetAllProjects} from "../../hooks/customHooks";

const ProjectsComponent = () => {

    const [projects, setProjects] = useState([]);
    const {
        isLoading,
        isSuccess,
        data
    } = useGetAllProjects()

    useEffect(() => {
        setProjects(data?.data?.result)
    }, [data]);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <>
        {isSuccess && <div id="projects" className='container'>
            <h1 style={{fontSize: '3.5rem'}}>{projects?.length}</h1>
            <h2 className="mb-5">Projects on Khronos</h2>
            <div className="row">
                {projects?.map((project, index) => {
                    return (
                        <div className="col-md-3 mb-5" key={index}>
                            <div className="project">
                                <Link to={`/project/dashboard/${project.project_code}`}>
                                    <h3>
                                        {toFirstLetterUpperCase(project.project_name)}
                                    </h3>
                                    {/*<span>By: Farin Gada</span>*/}
                                    <span>Target: {project.project_target}</span>
                                    {/*<span>Progress {project.project_target}</span>*/}
                                </Link>
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
