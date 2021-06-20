import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const withLayout = (WrappedComponent) => {
  return () => (
    <>
      <div className="app">
        <Header />
        <WrappedComponent />
      </div>
      <Footer />
    </>
  );
};

export default withLayout;
