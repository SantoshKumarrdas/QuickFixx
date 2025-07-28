import { NavLink } from "react-router-dom";
import {useAuth} from"../store/auth"
import "../css/about.css"

export const About = () => {
  const {user} = useAuth();

  return (
    <>
      <main className="about-main">
        <section className="section-hero">
          <div className="container grid grid-two-cols">
              <div className="hero-image">
              <img
                src="/img/ele.jpg"
                alt="coding buddies "
                width="400"
                height="500"
              />
            </div>
            <div className="hero-content">
              {/* <p>We care to cure your Health</p> */}

             <h1>Hi {user?.username} 👋</h1>

              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque quia, modi eveniet veniam magni error ullam possimus est enim distinctio dolores pariatur, doloribus unde beatae earum sunt! Impedit, sapiente sit.
                Reiciendis omnis pariatur perspiciatis optio laboriosam quae eum, quibusdam placeat aliquid nisi dolore quisquam maiores repudiandae? At voluptate debitis magni atque laborum expedita doloribus beatae, vitae quibusdam illo, cupiditate iure!
                Laborum explicabo sed nihil dolores fugit molestiae possimus nulla et adipisci beatae obcaecati optio alias tempora rerum doloremque, inventore, ea ducimus maiores expedita ut dolore nisi suscipit labore. Consequatur, aliquid.
               
              </p>
              <div className="ab-btn">
                <NavLink to="/contact">
                  <button className="ab-btn1"> Connect Now</button>
                </NavLink>
                <button className=" ab-btn1 ab-secondary-btn">learn more</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};