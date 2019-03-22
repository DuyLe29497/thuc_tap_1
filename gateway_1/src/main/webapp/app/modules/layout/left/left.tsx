import './header.scss';

import React from 'react';

import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
// import { PhanHeQuanLyCDTMenu } from './menus';

export interface ILeftProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    ribbonEnv: string;
    isInProduction: boolean;
    isSwaggerEnabled: boolean;
}

export interface ILeftState {
    menuOpen: boolean;
}

export default class Header extends React.Component<ILeftProps, ILeftState> {
    state: ILeftState = {
        menuOpen: false
    };

    toggleMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen });
    };

    render() {
        const { isAuthenticated, isAdmin, isSwaggerEnabled, isInProduction } = this.props;

        /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

        return (
            <div>
            </div>
        );
    }
}
