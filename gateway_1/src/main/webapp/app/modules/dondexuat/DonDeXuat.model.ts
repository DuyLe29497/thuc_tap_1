export interface IDonDeXuat {
    MA_DON?: number;
    MA_BENH_NHAN?: number;
    LI_DO?: string;
    CHE_DO_AN?: string;
    SO_PHIEU_LAN_1?: number;
    SO_PHIEU_LAN_2?: number;
    SO_PHIEU_LAN_3?: number;
    TINH_TRANG_DUYET?: number;
    NGAY_LAP?: string;
    NGAY_DUYET?: string;
}

export interface IBenhNhan {
    MA_BENH_NHAN?: number;
    TEN_BENH_NHAN?: string;
}

export const defaultValue: Readonly<IDonDeXuat> = {
    MA_DON: null,
    MA_BENH_NHAN: null,
    LI_DO: '',
    CHE_DO_AN: '',
    SO_PHIEU_LAN_1: 0,
    SO_PHIEU_LAN_2: 0,
    SO_PHIEU_LAN_3: 0,
    TINH_TRANG_DUYET: 0,
    NGAY_LAP: '',
    NGAY_DUYET: ''
};
