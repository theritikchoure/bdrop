import '../../assets/styles/home.css';
import logo from '../../assets/images/bdrop-logo.png';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
        <h1>BDROP</h1>

        <div className="logo-container">
            <img src={logo} alt=""/>
        </div>

        <h2>TAKE ACTION, MAKE A BLOOD DONATION</h2>

        <Link to="/join" className='join-button'>Join - BDROP</Link>
    </div>
  );
}


export default Home;