import { NavLink, Link } from "react-router-dom";
import Container from "./Container";

const NavItem = ({ children, to }) => {
  return (
    <NavLink
      className="py-4 px-4 hover:-translate-x-1 hover:bg-blue-950 transition-all font-bold text-white"
      to={to}
    >
      {children}
    </NavLink>
  );
};

const Navbar = () => {
  return (
    <header className="fixed top-0 w-screen flex justify-center p-6">
      <div className="bg-gradient-to-r from-violet-600 to-blue-700 rounded-2xl w-5xl">
        <Container className="items-center">
          <Link className="mr-auto text-white font-extrabold text-2xl" to="/">
            JOB INTERVIEWS
          </Link>
          <nav className="flex items-center">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/start-interview">Starte ein Interview</NavItem>
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
