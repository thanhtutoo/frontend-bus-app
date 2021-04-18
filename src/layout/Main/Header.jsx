import React, { Component } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo-black.svg";
import folderIcon from "../../assets/img/folder.png";
import AppUtil from "../../AppUtil.jsx";

import defaultAvatar from "../../assets/img/avatar.png";
import { AuthContext } from "../../components/Auth/AuthContext.jsx";

class Header extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    let image = defaultAvatar;

    this.state = {
      openMenu: false,
      avatarImage: image
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      openMenu: false
    });
  }

  logout(e) {
    e.preventDefault();
    e.stopPropagation();

    const { clearStorage } = this.context;
    clearStorage();

    window.location.replace("/sign-in");
  }

  toggleMenu(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      openMenu: !this.state.openMenu
    });
  }

  render() {
    return (
      <header className="bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 py-5 px-20 pt-5 items-center">
            <div className="header-links">
              <Link to="#" className="inline-block text-black mr-8">New Service</Link>
              <Link to="#" className="inline-block text-black mr-8">New Service</Link>
            </div>

            <div className="mx-auto">
              <Link to="/" className="inline-block text-black mr-8">
                Bus Service
              </Link>
            </div>

            <div className="text-right">
              <Link to="#" className="inline-block text-black mr-8"><img src={folderIcon} alt="" className="align-bottom w-6" /></Link>
              <div className="relative inline-block">
                <button className="h-12 w-12 rounded-full overflow-hidden text-black mr-8 focus:outline-none" onClick={(e) => this.toggleMenu(e)}>
                  <img src={this.state.avatarImage} alt="" className="rounded-full align-bottom w-6" />
                </button>

                <Transition
                  show={this.state.openMenu}
                  enter="transition ease-out duration-100 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  {(ref) => (
                    <div ref={ref} className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
                      <div className="rounded-md bg-white shadow-md">
                        <Link to="#" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-pink-200 hover:text-black font-bold">My Profile</Link>
                        <div><hr /></div>
                        <Link to="#" onClick={(e) => this.logout(e)} className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-pink-200 hover:text-black font-bold">Logout</Link>
                      </div>
                    </div>
                  )}
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

}

export default Header;
