import { Outlet } from 'react-router-dom';
import { DashNav } from '../components/DashNav';
import { Sidebar } from '../components/Sidebar';


const DashLayout = () => {
  return (
    <main className='dashboard'>
      <DashNav />
      <Sidebar />
      <div className='dashboard-page'>
          <Outlet />
      </div>
    </main>
  )
}

export default DashLayout