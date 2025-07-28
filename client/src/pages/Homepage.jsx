
import Carousel from "../components/carousal";
import { Link } from "react-router-dom";
import "../css/Homepage.css"

export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="home-banner">
            <h2>Welcome to QuickFix Service</h2>
            <p>Reliable Service At Your DoorStep</p>
            <Carousel />
          </div>
          <div className="home-container">
            <div className="home-container-headline">
              <h1>Service Booking Made Effortless</h1>
            </div>
            <div className="home-container-card">
              <div className="profile-card">
                <img
                  src="/img/ele.jpg"
                  className="profile-img"
                />
                <h2>Electrician</h2>
                <h3>Powering Homes & Workspaces Safely</h3>
                <p>
                  An electrician is a skilled tradesperson who installs, maintains, and repairs electrical systems in homes, businesses, and construction sites.
                </p>
                <Link to="/electrician">
                  <button>Explore</button>
                </Link>
              </div>
              <div className="profile-card">
                <img
                  src="/img/p.jpg"
                  className="profile-img"
                />
                <h2>Plumber</h2>
                <h3>Expert in Water Systems & Repairs</h3>
                <p>
                  A plumber is responsible for installing and maintaining water supply lines, waste drainage systems, and related fixtures in residential.
                </p>
                <Link to="/plumber">
                  <button>Explore</button>
                </Link>
              </div>
              <div className="profile-card">
                <img
                  src="/img/ma.jpg"
                  className="profile-img"
                />
                <h2>Mason</h2>
                <h3>Building Strong Foundations & Structures</h3>
                <p>
                  A mason builds and repairs structures using bricks, stones, concrete blocks, and other materials.
                  Key Responsibilities:
                </p>
                <Link to="/mason">
                  <button>Explore</button>
                </Link>
              </div>
              <div className="profile-card">
                <img
                  src="/img/l.jpg"
                  className="profile-img"
                />
                <h2>Labourer</h2>
                <h3>Reliable Support for Every Task</h3>
                <p>
                  A labourer performs general physical work to support skilled tradespeople on construction sites or maintenance projects.
                </p>
                <Link to="/labour">
                  <button>Explore</button>
                </Link>
              </div>
              <div className="profile-card">
                <img
                  src="/img/ca1.jpg"
                  className="profile-img"
                />
                <h2>Carpenter</h2>
                <h3>Crafting with Wood,Creating with Skill</h3>
                <p>
                  A carpenter works with wood and other materials to build, install, and repair frameworks, structures, and fixtures.
                </p>
                <Link to="/carpenter">
                  <button>Explore</button>
                </Link>
              </div><div className="profile-card">
                <img
                  src="/img/t.jpg"
                  className="profile-img"
                />
                <h2>Tile Constructor</h2>
                <h3>Precision Tiling for Elegant Finishes</h3>
                <p>
                  A tile constructor, or tiler, specializes in laying tiles made of ceramic, marble, stone, or glass on floors, walls, and other surfaces.
                </p>
                <Link to="/tile">
                  <button>Explore</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};