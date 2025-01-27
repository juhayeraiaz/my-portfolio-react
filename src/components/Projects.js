import { Container, Row, Col, Tab } from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useEffect, useState } from "react";
import Loading from "./Loading";
import ProjectCard from "./ProjectCard";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const itemsPerPage = 6; // Number of items per page for desktop view

  useEffect(() => {
    fetch('https://portfolio-server-raue.onrender.com/projects', {
      method: 'GET'
    }).then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading to false when there's an error
      });
  }, [])

  if (loading) {
    // Render loading animation while data is being fetched
    return (
      <div>
        <p className="text-center m-4 text-white d-block">Please wait for few seconds the is gtting fetched</p>
        <Loading></Loading>
      </div>

    );
  }

  if (error) {
    // Render error message if there's an error
    return (
      <div className="text-center py-6 px-2 md:px-5 lg:px-10">
        <p className="text-red-500">Error fetching data from the server. Please try again later.</p>
      </div>
    );
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated" : ""}>
                  <h2>Projects</h2>
                  <p>These are the most recent projects I've completed.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Tab.Content id="slideInUp" className={isVisible ? "" : ""}>
                      <Tab.Pane eventKey="first">
                        <div className="d-none d-md-block" style={{ height: "496px" }}> {/* Desktop view */}
                          <Row>
                            {
                              currentProjects.map((project, index) => {
                                return (
                                  <Col md={4} key={index}>
                                    <ProjectCard {...project} />
                                  </Col>
                                )
                              })
                            }
                          </Row>
                          <div className="pagination mt-4 d-flex justify-content-center gap-2"> {/* Pagination controls */}
                            {[...Array(totalPages).keys()].map(page => (
                              <button
                                key={page}
                                className={`pagination-btn px-3 py-2 rounded ${page + 1 === currentPage ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                                style={{ border: 'none', cursor: 'pointer', transition: 'background-color 0.3s ease', fontSize: '1rem' }}
                                onClick={() => paginate(page + 1)}
                              >
                                {page + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="d-block d-md-none"> {/* Mobile/Tablet view */}
                          <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
                            {
                              projects.map((project, index) => {
                                return (
                                  <ProjectCard key={index} {...project} />
                                )
                              })
                            }
                          </Carousel>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" alt="" src={colorSharp2}></img>
    </section>
  )
}
