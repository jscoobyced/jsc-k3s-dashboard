import { CommonPageData } from 'jsc-k3s-dashboard-common/src/models/home/home';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ApplicationContext } from './context';
import {
  ApplicationContextData,
  defaultApplicationContext,
} from './models/applicationContext';
import { getCommonPageData } from './services/pageContent';
import { AppRouter } from './services/routing/routes';

const App = () => {
  const [applicationContextData, setApplicationContextData] = useState(
    defaultApplicationContext,
  );

  useEffect(() => {
    const getPageData = async () => {
      const commonPageData = await getCommonPageData();
      setCommonPageData(commonPageData);
    };

    const setCommonPageData = (commonPageData: CommonPageData) => {
      const applicationData: ApplicationContextData = {
        version: commonPageData.version,
        year: commonPageData.year,
        siteName: commonPageData.siteName,
      };
      setApplicationContextData(applicationData);
    };

    getPageData().catch((e: unknown) => {
      void e;
    });
  }, []);

  return (
    <main className="mb-auto font-primary">
      <ApplicationContext.Provider value={applicationContextData}>
        <RouterProvider router={AppRouter} />
      </ApplicationContext.Provider>
    </main>
  );
};

export default App;
