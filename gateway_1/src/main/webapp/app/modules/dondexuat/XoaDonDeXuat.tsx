import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDonDeXuat, deleteDonDeXuat } from './DonDeXuat.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaDonDeXuatProps extends StateProps, DispatchProps, RouteComponentProps<{ dondexuat: string }> {}

export class XoaDonDeXuatScript extends React.Component<IXoaDonDeXuatProps> {
    componentDidMount() {
        this.props.getDonDeXuat(this.props.match.params.dondexuat);
    }

    xoaDonDeXuat = event => {
        this.props.deleteDonDeXuat(this.props.dondexuat.MA_DON);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { dondexuat } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa đơn đề xuất</ModalHeader>
                <ModalBody>Xóa đơn đề xuất này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaDonDeXuat}>
                        <FontAwesomeIcon icon="trash" />
                        &nbsp; Xóa
                    </Button>
                    <Button color="secondary" onClick={this.dongHopThoai}>
                        <FontAwesomeIcon icon="ban" />
                        &nbsp; Không
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    dondexuat: storeState.dondexuat.donDeXuat
});

const mapDispatchToProps = { getDonDeXuat, deleteDonDeXuat };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaDonDeXuatScript);
