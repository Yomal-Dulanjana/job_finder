import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../redux/userSlice";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";



function MenuList({ user, onClick }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout());
    window.location.replace("/");
  };

  return (
    <div>
      <Menu as='div' className='inline-block text-left '>
        <div className='flex'>
          <Menu.Button className='inline-flex gap-2 w-full rounded-md bg-white md:px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-20 '>
            <div className='leading[80px] flex flex-col items-start'>
              <p className='text-sm font-semibold '>
                {user?.firstName ?? user?.name}
              </p>
              <span className='text-sm text-blue-600 '>
                {user?.jobTitle ?? user?.email}
              </span>
            </div>

            {user?.profileUrl ? (
              <img
                src={user?.profileUrl}
                alt='user profile'
                className='w-10 h-10 rounded-full object-cover '
              />
            ) : (
              <div className='w-10 h-10 rounded-full bg-indigo-600 text-white text-lg flex items-center justify-center'>
                {user?.firstName?.slice(0, 1) || user?.name?.slice(0, 1)}
              </div>
            )}
            <BiChevronDown
              className='h-8 w-8 text-slate-600'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y dividfe-gray-100 rounded-md bg-white shadow-lg focus:outline-none '>
            <div className='p-1 '>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${user?.accountType ? "user-profile" : "company-profile"
                      }`}
                    className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md p-2 text-sm`}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`${active ? "text-white" : "text-gray-600"
                        } mr-2 h-5 w-5  `}
                      aria-hidden='true'
                    />
                    {user?.accountType ? "User Profile" : "Company Profile"}
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLogout()}
                    className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineLogout
                      className={`${active ? "text-white" : "text-gray-600"
                        } mr-2 h-5 w-5  `}
                      aria-hidden='true'
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };
  const navigate = useNavigate();

  const navigateToHome = () => {
    // 👇️ navigate to /Home
    navigate("/");
  };


  return (
    <>
      <div className='relative bg-[#f7fdfd] z-50'>
        <nav className='container mx-auto flex items-left justify-between p-5'>
          <a className="flex items-left space-x-3 rtl:space-x-reverse gap-4">
            <img src="/icon.jpg" onClick={navigateToHome} className="ml-5 h-10" alt="Flowbite Logo" />
            <span onClick={navigateToHome} className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black-500">Gamage Recruiters</span>
            <button
              className="blocklg:hidden lg:text-slate-100 text-slate-900"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
            </button>
          </a>

          <ul className='hidden lg:flex gap-10 text-base'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link
                to={
                  user?.accountType === "seeker"
                    ? "/companies" : "/find-jobs"
                }
              >
                {user?.accountType === "seeker" ? "Companies" : "Careers"}
              </Link>
            </li>
            <li>
              <Link to='/Testimonials'>Testimonials</Link>
            </li>
            <li>
              <Link to='/journey'>Our Journey</Link>
            </li>
            <li>
              <Link
                to={
                  user?.accountType === "seeker"
                    ? "/Upload-job" : "/contact-us"
                }
              >
                {user?.accountType === "seeker" ? "Upload Job" : "ContactUs"}
              </Link>
            </li>
            <li>
              <Link to='/about-us'>About</Link>
            </li>
          </ul>

          <div className='hidden lg:block'>
            {!user?.token ? (
              <a href='/user-auth'>
                <CustomButton
                  title='Sign In'
                  containerStyles='text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600'
                />
              </a>
            ) : (
              <div>
                <MenuList user={user} />
              </div>
            )}
          </div>

          {/* <button
            className='ml-96 block lg:hidden text-slate-900'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button> */}
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`${isOpen ? "absolute flex bg-[#f7fdfd] " : "hidden"
            } container mx-auto lg:hidden flex-col pl-8 gap-3 py-1`}
        >
          <Link to='/' onClick={handleCloseNavbar}>
            Home
          </Link>
          <Link to='/find-jobs' onClick={handleCloseNavbar}>
            Careers
          </Link>
          <Link to='/Testimonials' onClick={handleCloseNavbar}>
            Testimonials
          </Link>
          <Link to='/journey' onClick={handleCloseNavbar}>
            Out Journey
          </Link>
          <Link to='/contact-us' onClick={handleCloseNavbar}>
            Contact US
          </Link>
          <Link to='/about-us' onClick={handleCloseNavbar}>
            About
          </Link>

          <div className='w-full py-10'>
            {!user?.token ? (
              <a href='/user-auth'>
                <CustomButton
                  title='Sign In'
                  containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                />
              </a>
            ) : (
              <div>
                <MenuList user={user} onClick={handleCloseNavbar} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
