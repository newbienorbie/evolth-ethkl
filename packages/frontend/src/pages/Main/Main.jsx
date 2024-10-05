import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Button from "../../components/Button/Button";
import "./Main.styles.css";

const Main = () => {
  return (
    <div>
      {" "}
      <Header />
      <main className='main-content'>
        <div className='phone-image'>
          <img
            src='/phone-mockup.png'
            alt='Phone'
          />
        </div>
        <div className='text-content'>
          <h1>Lorem ipsum odor amet</h1>
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Vulputate
            mattis molestie gravida mollis vel dictumst leo.
          </p>
          <div className='buttons'>
            <Link to='/Profile'>
              <Button className='cta-button'>Buy Franchise</Button>
            </Link>
            <Button className='cta-button'>Sell Franchise</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
