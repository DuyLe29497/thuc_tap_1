import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import {
    ICrudGetAllAction,
    ICrudPutAction,
    TextFormat,
    JhiPagination,
    getPaginationItemsNumber,
    getSortState,
    IPaginationBaseState
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getDanhSachDonDeXuat, updateDonDeXuat } from './DonDeXuat.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IHienThiDanhSachDonDeXuatProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export class DanhSachDonDeXuat extends React.Component<IHienThiDanhSachDonDeXuatProps, IPaginationBaseState> {
    state: IPaginationBaseState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE)
    };

    componentDidMount() {
        this.getDanhSachDonDeXuat();
    }

    sort = prop => () => {
        this.setState(
            {
                order: this.state.order === 'asc' ? 'desc' : 'asc',
                sort: prop
            },
            () => this.SapXepDonDeXuat()
        );
    };

    SapXepDonDeXuat() {
        this.getDanhSachDonDeXuat();
        this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
    }

    handlePagination = activePage => this.setState({ activePage }, () => this.SapXepDonDeXuat());

    getDanhSachDonDeXuat = () => {
        const { activePage, itemsPerPage, sort, order } = this.state;
        this.props.getDanhSachDonDeXuat(activePage - 1, itemsPerPage, `${sort},${order}`);
    };

    updateTrangThai = donDeXuat => () => {
        this.props.updateDonDeXuat({
            ...donDeXuat,
            TINH_TRANG_DUYET: donDeXuat.TINH_TRANG_DUYET === 0 ? 1 : 0
        });
    };

    render() {
        const { danhSachDonDeXuat, match } = this.props;
        return (
            <div>
                <h2 id="user-management-page-heading">
                    Danh sách đơn đề xuất suất ăn từ thiện
                    <Link to={`${match.url}/them-moi`} className="btn btn-primary float-right jh-create-entity">
                        <FontAwesomeIcon icon="plus" /> Thêm mới đơn đề xuất
                    </Link>
                </h2>
                <Table responsive striped>
                    <thead>
                    <tr>
                        <th className="hand">
                            Mã bệnh nhân
                        </th>
                        <th className="hand">
                            Lí do
                        </th>
                        <th className="hand">
                            Tình trạng
                        </th>
                        <th className="hand">
                            Ngày lập
                        </th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        danhSachDonDeXuat.map((dondexuat, i) => (
                        <tr key={`user-${i}`}>
                            <td>{dondexuat.MA_BENH_NHAN}</td>
                            <td>{dondexuat.LI_DO}</td>
                            <td>
                                {dondexuat.TINH_TRANG_DUYET === 1 ? (
                                    <Button color="success" onClick={this.updateTrangThai(dondexuat)}>
                                        Duyệt
                                    </Button>
                                ) : (
                                    <Button color="danger" onClick={this.updateTrangThai(dondexuat)}>
                                        Không được duyệt
                                    </Button>
                                )}
                            </td>
                            <td>{dondexuat.NGAY_LAP}</td>
                            <td className="text-right">
                                <div className="btn-group flex-btn-group-container">
                                    <Button tag={Link} to={`${match.url}/${dondexuat.MA_DON}`} color="info" size="sm">
                                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                    </Button>
                                    <Button tag={Link} to={`${match.url}/${dondexuat.MA_DON}/them-moi`} color="primary" size="sm">
                                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                                    </Button>
                                    <Button
                                        tag={Link}
                                        to={`${match.url}/${dondexuat.MA_DON}/xoa`}
                                        color="danger"
                                        size="sm"
                                    >
                                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Xóa</span>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    danhSachDonDeXuat: storeState.dondexuat.danhSachDonDeXuat
});

const mapDispatchToProps = { getDanhSachDonDeXuat, updateDonDeXuat };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachDonDeXuat);
