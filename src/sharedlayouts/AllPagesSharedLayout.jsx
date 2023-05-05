import { Navbar, Footer, Sidebar } from '../components';
import { Outlet } from 'react-router-dom';

const AllPagesSharedLayout = () => {
  return (

    <>    
    
        <Navbar />
        <Sidebar />

        <Outlet />

        <Footer />

    </>

  )
}
export default AllPagesSharedLayout