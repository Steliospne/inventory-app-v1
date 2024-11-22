import { ArrowRight, BarChart2, Layers, Search } from 'lucide-react';
import { useOutlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import Sidebar from '../components/Sidebar';

const Root = () => {
  const { user, logoutAction } = useContext(AuthContext);
  const Outlet = useOutlet();

  return (
    <div className='grid min-h-svh auto-cols-auto grid-cols-main_layout grid-rows-main_layout'>
      <Navbar user={user} logoutAction={logoutAction} />
      <Sidebar user={user} />
      <div
        className={`${user ? 'col-start-2' : 'col-start-1 col-end-3'} bg-zinc-100 dark:bg-zinc-600 dark:text-white`}
      >
        {Outlet !== null ? (
          Outlet
        ) : (
          <div className='flex min-h-screen flex-col'>
            <main className='flex-grow'>
              <section className='bg-emerald-50 py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                  <div className='text-center'>
                    <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                      Simplify Your Inventory Management
                    </h1>
                    <p className='mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl'>
                      Streamline your operations, reduce costs, and boost
                      efficiency with our powerful inventory management
                      solution.
                    </p>
                    <div className='mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8'>
                      <div className='rounded-md shadow'>
                        <a
                          href='#'
                          className='flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-base font-medium text-white hover:bg-emerald-700 md:px-10 md:py-4 md:text-lg'
                        >
                          Get Started
                        </a>
                      </div>
                      <div className='mt-3 rounded-md shadow sm:ml-3 sm:mt-0'>
                        <a
                          href='#'
                          className='flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-emerald-600 hover:bg-gray-50 md:px-10 md:py-4 md:text-lg'
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className='py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                  <h2 className='mb-12 text-center text-3xl font-extrabold text-gray-900'>
                    Key Features
                  </h2>
                  <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                    <FeatureCard
                      icon={<Search className='h-8 w-8 text-emerald-600' />}
                      title='Real-time Tracking'
                      description='Monitor your inventory levels in real-time, ensuring you never run out of stock.'
                    />
                    <FeatureCard
                      icon={<BarChart2 className='h-8 w-8 text-emerald-600' />}
                      title='Advanced Analytics'
                      description='Gain valuable insights with our powerful reporting and analytics tools.'
                    />
                    <FeatureCard
                      icon={<Layers className='h-8 w-8 text-emerald-600' />}
                      title='Multi-location Support'
                      description='Manage inventory across multiple locations with ease and efficiency.'
                    />
                  </div>
                </div>
              </section>

              <section className='bg-emerald-600 py-20'>
                <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
                  <h2 className='mb-4 text-3xl font-extrabold text-white'>
                    Ready to Optimize Your Inventory?
                  </h2>
                  <p className='mb-8 text-xl text-emerald-100'>
                    Join thousands of businesses that trust InventoryPro for
                    their inventory management needs.
                  </p>
                  <a
                    href='#'
                    className='inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-emerald-600 hover:bg-emerald-50'
                  >
                    Start Your Free Trial{' '}
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </a>
                </div>
              </section>
            </main>

            <footer className='bg-gray-800 py-12 text-white'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
                  <div>
                    <h3 className='mb-4 text-lg font-semibold'>Product</h3>
                    <ul className='space-y-2'>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          Features
                        </a>
                      </li>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          Pricing
                        </a>
                      </li>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          Integrations
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className='mb-4 text-lg font-semibold'>Company</h3>
                    <ul className='space-y-2'>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          Careers
                        </a>
                      </li>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className='mb-4 text-lg font-semibold'>Resources</h3>
                    <ul className='space-y-2'>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          Blog
                        </a>
                      </li>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          Documentation
                        </a>
                      </li>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          Support
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className='mb-4 text-lg font-semibold'>Legal</h3>
                    <ul className='space-y-2'>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          Terms of Service
                        </a>
                      </li>
                      <li>
                        <a href='#' className='hover:text-emerald-400'>
                          Cookie Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='mt-8 border-t border-gray-700 pt-8 text-center'>
                  <p>&copy; 2023 InventoryPro. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Root;
