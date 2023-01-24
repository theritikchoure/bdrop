import '../../assets/styles/home.css';
import logo from '../../assets/images/bdrop-logo.png';
function Home() {
  return (
    <div className="home-container">
        <h1>BDROP</h1>

        <div className="logo-container">
            <img src={logo} alt=""/>
        </div>

        <h2>TAKE ACTION, MAKE A BLOOD DONATION</h2>

        <button>Join - BDROP</button>
    </div>
  );
}

export default Home;