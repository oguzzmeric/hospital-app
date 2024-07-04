import React from 'react';
import { Provider } from 'react-redux';
import {store} from './app/store';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportList from './components/ReportList';

import ReportDetail from './components/ReportDetail';
import AddReport from './components/AddReport';
import UpdateReport from './components/UpdateReport';


function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ReportList />} />
            <Route path="/report/:id" element={<ReportDetail />} />
            <Route path="/add-report" element={<AddReport />} />
            <Route path="/update-report/:id" element={<UpdateReport />} />
          </Routes>
        </Router>
      </MantineProvider>
    </Provider>
  );
}

export default App;

