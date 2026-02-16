import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Process from './components/Process';
import CallToAction from './components/CallToAction';

function App() {
  return (
    <Layout>
      <Hero />
      <Stats />
      <Process />
      <CallToAction />
    </Layout>
  );
}

export default App;
