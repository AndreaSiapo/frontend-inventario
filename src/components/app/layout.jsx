import { useState } from 'react';
import Sidebar from './sidebar';
import Nav from './navbar';

const Layout = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <>
        <div className="flex flex-col min-h-screen">
          <header className="fixed top-0 left-0 right-0 z-100">
            <Nav toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          </header>
          <section className="flex flex-1 pt-16">
            <Sidebar isOpen={isSidebarOpen} />
            <main className="flex-1 transition-all duration-300 bg-gray-50 dark:bg-gray-800 p-4">
            {props.children}</main>
          </section>
        </div>
        </>
    );
}

export default Layout;