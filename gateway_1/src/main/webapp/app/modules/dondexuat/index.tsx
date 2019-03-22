import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachDonDeXuat from './DanhSachDonDeXuat';
import ThemDonDeXuat from './ThemMoiDonDeXuat';
import XoaDonDeXuat from './XoaDonDeXuat';
import XemDonDeXuat from './XemDonDeXuat';
// import UserManagementDeleteDialog from "app/modules/administration/user-management/user-management-delete-dialog";

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi`} component={ ThemDonDeXuat } />
            <ErrorBoundaryRoute exact path={`${match.url}/:dondexuat/them-moi`} component={ ThemDonDeXuat } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:dondexuat`} component={ XemDonDeXuat } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachDonDeXuat } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:dondexuat/xoa`} component={ XoaDonDeXuat } />
    </>
);

export default Routes;
