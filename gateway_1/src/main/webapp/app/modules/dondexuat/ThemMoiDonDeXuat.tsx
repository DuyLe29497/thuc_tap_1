import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDonDeXuat, getDanhSachBenhNhan, addDonDeXuat, updateDonDeXuat, reset } from './DonDeXuat.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiDonDeXuatProps extends StateProps, DispatchProps, RouteComponentProps<{ dondexuat: string }> {}

export interface IThemMoiDonDeXuatState {
    isNew: boolean;
}

export class ThemDonDeXuat extends React.Component<IThemMoiDonDeXuatProps, IThemMoiDonDeXuatState> {
    state: IThemMoiDonDeXuatState = {
        isNew: !this.props.match.params || !this.props.match.params.dondexuat
    };

    componentDidMount() {
        this.props.getDanhSachBenhNhan();
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getDonDeXuat(this.props.match.params.dondexuat);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuDonDeXuat = (event, values) => {
        if (this.state.isNew) {
            this.props.addDonDeXuat(values);
        } else {
            this.props.updateDonDeXuat(values);
        }
        this.troVeDanhSach();
    };

    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { dondexuat, danhSachBenhNhan, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới đơn đề xuất</h1>) : (<h1>Cập nhật đơn đề xuất</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuDonDeXuat}>
                                {dondexuat.MA_DON ? (
                                    <AvGroup>
                                        <Label for="id">Mã đơn đề xuất</Label>
                                        <AvField type="text" className="form-control" name="MA_DON" required readOnly value={dondexuat.MA_DON} />
                                    </AvGroup>
                                ) : null}
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <label>Bệnh nhân</label>
                                            <AvField type="select" name="MA_BENH_NHAN" value="1">
                                                {
                                                    danhSachBenhNhan.map((ele, i) => (
                                                        <option key={ele.MA_BENH_NHAN} value={ ele.MA_BENH_NHAN }>
                                                            {ele.TEN_BENH_NHAN}
                                                        </option>
                                                    ))}
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <label>Bệnh nhân</label>
                                            <AvField type="select" name="MA_BENH_NHAN" value={dondexuat.MA_BENH_NHAN}>
                                                {
                                                    danhSachBenhNhan.map((ele, i) => (
                                                        <option key={ele.MA_BENH_NHAN} value={ ele.MA_BENH_NHAN }>
                                                            {ele.TEN_BENH_NHAN}
                                                        </option>
                                                    ))}
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <AvGroup>
                                    <Label for="lido">Lí do</Label>
                                    <AvField
                                        type="text"
                                        className="form-control"
                                        name="LI_DO"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập lí do.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập lí do đề xuất.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Lí do không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={dondexuat.LI_DO}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <label>Chế độ ăn</label>
                                    <AvField type="select" name="CHE_DO_AN" value={dondexuat.CHE_DO_AN}>
                                                <option value="0">
                                                    Bình thường
                                                </option>
                                                <option value="1">
                                                    Bệnh nhân
                                                </option>
                                    </AvField>
                                </AvGroup>
                                <AvGroup>
                                    <Label for="sophieu1">Số phiếu lần 1</Label>
                                    <AvField
                                        type="number"
                                        className="form-control"
                                        name="SO_PHIEU_LAN_1"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập số phiếu phát lần 1.'
                                            }
                                        }}
                                        value={dondexuat.SO_PHIEU_LAN_1}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="sophieu2">Số phiếu lần 2</Label>
                                    <AvField
                                        type="number"
                                        className="form-control"
                                        name="SO_PHIEU_LAN_2"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập số phiếu phát lần 2.'
                                            }
                                        }}
                                        value={dondexuat.SO_PHIEU_LAN_2}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="sophieu3">Số phiếu lần 3</Label>
                                    <AvField
                                        type="number"
                                        className="form-control"
                                        name="SO_PHIEU_LAN_3"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập số phiếu phát lần 3.'
                                            }
                                        }}
                                        value={dondexuat.SO_PHIEU_LAN_3}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <label>Tình trạng duyệt</label>
                                    <AvField type="select" name="TINH_TRANG_DUYET" value="1">
                                        <option value="1">Được duyệt</option>
                                        <option value="0">Không được duyệt</option>
                                    </AvField>
                                </AvGroup>
                                <AvGroup>
                                    <Label for="ngaylap">Ngày lập</Label>
                                    <AvField
                                        type="text"
                                        className="form-control"
                                        name="NGAY_LAP"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập ngày lập.'
                                            },
                                            minLength: {
                                                value: 10,
                                                errorMessage: 'Chưa nhập ngày lập'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Chưa nhập ngày lập'
                                            }
                                        }}
                                        value={dondexuat.NGAY_LAP}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="ngayduyet">Ngày duyệt</Label>
                                    <AvField
                                        type="text"
                                        className="form-control"
                                        name="NGAY_DUYET"
                                        value={dondexuat.NGAY_DUYET}
                                    />
                                </AvGroup>
                                <Button tag={Link} to="/don-de-xuat" replace color="info">
                                    <FontAwesomeIcon icon="arrow-left" />
                                    &nbsp;
                                    <span className="d-none d-md-inline">Trở về</span>
                                </Button>
                                &nbsp;
                                <Button color="primary" type="submit" disabled={isInvalid || updating}>
                                    <FontAwesomeIcon icon="save" />
                                    &nbsp; Lưu
                                </Button>
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
    danhSachBenhNhan: storeState.dondexuat.danhSachBenhNhan,
    loading: storeState.dondexuat.loading,
    updating: storeState.dondexuat.updating
});

const mapDispatchToProps = { getDonDeXuat, getDanhSachBenhNhan, addDonDeXuat, updateDonDeXuat, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemDonDeXuat);
