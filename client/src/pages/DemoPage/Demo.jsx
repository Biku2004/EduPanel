import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function Demo() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default Demo;