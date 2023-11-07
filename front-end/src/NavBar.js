import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavItem, NavLink, Nav } from 'reactstrap';
import './NavBar.css';

const NavBar = ({ currUser, logout }) => {
    return (
        currUser.username !== '' ? (            
            <Navbar className='navbar' expand="sm">
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href={`/${currUser.username}`}>Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Browse">Browse</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem >
                        <NavLink href="/" onClick={logout}>Logout</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        ) : (
            <Navbar className='navbar' expand="sm">
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href={`/Login`}>Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Browse">Browse</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem >
                        <NavLink href="/Login">Login</NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink href="/Signup">Signup</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    )
}


export default NavBar