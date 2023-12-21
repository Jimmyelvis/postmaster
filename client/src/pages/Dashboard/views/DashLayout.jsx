import { Outlet } from 'react-router-dom';
import { DashNav } from '../components/DashNav';
import { Sidebar } from '../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';


export const DashLayout = () => {

  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);

  return (
    <main className={`dashboard ${uiMode === "dark" ? "dashboard-dark" : ""}`}>
      <DashNav />
      <Sidebar />
      <div className='dashboard-page'>
          <Outlet />
      </div>
    </main>
  )
}

