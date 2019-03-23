import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDonDeXuat } from './DonDeXuat.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiDonDeXuatProps extends StateProps, DispatchProps, RouteComponentProps<{ dondexuat: string }> {}

export class XemDonDeXuat extends React.Component<IThemMoiDonDeXuatProps> {
    componentDidMount() {
            this.props.getDonDeXuat(this.props.match.params.dondexuat);

    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { dondexuat, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Thông tin đơn đề xuất</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                    <AvGroup>
                                        <Label for="MADON">Mã đơn đề xuất</Label>
                                        <AvField type="text" className="form-control" name="MA_DON" required readOnly value={dondexuat.MA_DON} />
                                    </AvGroup>
                                <AvGroup>
                                    <Label for="mabenhnhan">Mã bệnh nhân</Label>
                                    <AvField
                                        name="MA_BENH_NHAN"
                                        type="text"
                                        className="form-control"
                                        readOnly
                                        value={dondexuat.MA_BENH_NHAN}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="lido">Lí dot</Label>
                                    <AvField
                                        name="LI_DO"
                                        type="text"
                                        className="form-control"
                                        readOnly
                                        value={dondexuat.LI_DO}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="chedoan">Chế độ ăn</Label>
                                    <AvField
                                        name="CHE_DO_AN"
                                        type="text"
                                        className="form-control"
                                        readOnly
                                        value={dondexuat.CHE_DO_AN}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="sophieulan1">Số phiếu lần 1</Label>
                                    <AvField
                                        name="SO_PHIEU_LAN_1"
                                        type="text"
                                        className="form-control"
                                        readOnly
                                        value={dondexuat.SO_PHIEU_LAN_1}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="sophieulan2">Số phiếu lần 2</Label>
                                    <AvField
                                        name="SO_PHIEU_LAN_2"
                                        type="text"
                                        className="form-control"
                                        readOnly
                                        value={dondexuat.SO_PHIEU_LAN_2}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="sophieulan3">Số phiếu lần 3</Label>
                                    <AvField
                                        name="SO_PHIEU_LAN_3"
                                        type="text"
                                        className="form-control"
                                        readOnly
                                        value={dondexuat.SO_PHIEU_LAN_3}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="tinhtrangduyet">Tình trạng duyệt</Label>
                                    <AvField
                                        style={{ color:  dondexuat.TINH_TRANG_DUYET === 1 ? '#7FFF00' : 'Red' } }
                                        name="TINH_TRANG_DUYET"
                                        type="text"
                                        className="form-control"
                                        readOnly
                                        value={dondexuat.TINH_TRANG_DUYET === 1 ? 'Đã được duyệt' : 'Không được duyệt'}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="ngaylap">Ngày lập</Label>
                                    <AvField
                                        name="NGAY_LAP"
                                        type="text"
                                        className="form-control"
                                        readOnly
                                        value={dondexuat.NGAY_LAP}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="ngayduyet">Ngày duyệt</Label>
                                    <AvField
                                        name="NGAY_DUYET"
                                        type="text"
                                        className="form-control"
                                        readOnly
                                        value={dondexuat.NGAY_DUYET}
                                    />
                                </AvGroup>
                                <Button tag={Link} to="/don-de-xuat" replace color="info">
                                    <FontAwesomeIcon icon="arrow-left" />
                                    &nbsp;
                                    <span className="d-none d-md-inline">Trở về</span>
                                </Button>
                                &nbsp;
                            </AvForm>
                        )}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    dondexuat: storeState.dondexuat.donDeXuat,
    loading: storeState.dondexuat.loading,
    updating: storeState.dondexuat.updating
});

const mapDispatchToProps = { getDonDeXuat };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XemDonDeXuat);
