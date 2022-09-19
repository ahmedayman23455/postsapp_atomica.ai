import React from "react";
import classes from "./Home.module.scss";
import { Button, PageTransition } from "../components";
import { AiFillGithub } from "react-icons/ai";
/* ------------------------------------------------------ */
const Home = () => {
  return (
    <PageTransition>
      <div className={`${classes.home}`}>
        <div className={`${classes.container}`}>
          <div className={`${classes.about}`}>
            <div className={`${classes.heading}`}>
              <h1>POSTS APP</h1>
              <p>Description and code of the project in my github</p>
            </div>

            <div className={`${classes.github}`}>
              <Button
                text="Source code"
                onClick={() => {
                  window.location.href =
                    "https://github.com/ahmedayman23455/postsapp-atomiai";
                }}
              />
              <AiFillGithub />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
