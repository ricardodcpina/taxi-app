import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import styled from 'styled-components';
import MainContainer from './MainContainer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  background: linear-gradient(to right, #3f603f, #0a220a, #073207);
`;

const Nav = styled.nav`
  ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 0;
  }
`;

const NavItem = styled.li`
  a {
    color: white;
    font-weight: 600;
    text-decoration: none;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  background-image: url('taxi-app-bg2.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;

  @media (max-width: 576px) {
    padding: 0;
  }
`;

const Footer = styled.footer`
  background: linear-gradient(to right, #3f603f, #0a220a, #073207);
  color: white;
  text-align: center;
`;

const Layout: React.FC = () => {
  return (
    <Wrapper>
      <Header>
        <Nav>
          <ul>
            <NavItem>
              <Link to='/'>Solicitar viagem</Link>
            </NavItem>
            <NavItem>
              <Link to='/history'>Histórico de viagens</Link>
            </NavItem>
          </ul>
        </Nav>
      </Header>

      <Main>
        <MainContainer>
          <Outlet />
        </MainContainer>
      </Main>

      <Footer>
        <p>
          © 2024 WhichWayNow. Todos os direitos reservados. Desenvolvido
          por Ricardo Pina
        </p>
      </Footer>
    </Wrapper>
  );
};

export default Layout;
