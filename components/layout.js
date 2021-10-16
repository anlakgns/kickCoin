import React from 'react';
import Header from './header';
import Footer from './footer';


const Layout = ({ children }) => {
  return (
    <div style={{maxWidth: "95%", margin: "auto"}}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
