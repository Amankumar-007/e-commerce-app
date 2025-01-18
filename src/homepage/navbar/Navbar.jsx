import { useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    
  return (
    <nav className="navbar">
    <div className="navbar-logo">Amazzing Store</div>
    <ul className="navbar-links">
        <li onClick={()=>navigate('/home')}><a>Home</a></li>
        <li><a >Categories</a></li>
        <li onClick={()=>navigate('/about')} ><a>About</a></li>
        <li onClick={()=>navigate('/Contact')} ><a>Contact</a></li>
    </ul>
    
</nav>
  )
}

export default Navbar