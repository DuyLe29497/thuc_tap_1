import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IDonDeXuat, defaultValue, IBenhNhan } from './DonDeXuat.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_DDX: 'DonDeXuat/LAY_DANH_SACH_DDX',
    LAY_DANH_SACH_BN: 'DonDeXuat/LAY_DANH_SACH_BN',
    LAY_DON_DE_XUAT: 'DonDeXuat/LAY_DON_DE_XUAT',
    TAO_DON_DE_XUAT: 'DonDeXuat/TAO_DON_DE_XUAT',
    CAP_NHAT_DON_DE_XUAT: 'DonDeXuat/CAP_NHAT_DON_DE_XUAT',
    XOA_DON_DE_XUAT: 'DonDeXuat/XOA_DON_DE_XUAT',
    RESET: 'DonDeXuat/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    danhSachDonDeXuat: [] as ReadonlyArray<IDonDeXuat>,
    danhSachBenhNhan: [] as ReadonlyArray <IBenhNhan>,
    authorities: [] as any[],
    donDeXuat: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type donDeXuatState = Readonly<typeof initialState>;

// Reducer
export default (state: donDeXuatState = initialState, action): donDeXuatState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DDX):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_BN):
        case REQUEST(ACTION_TYPES.LAY_DON_DE_XUAT):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_DON_DE_XUAT):
        case REQUEST(ACTION_TYPES.CAP_NHAT_DON_DE_XUAT):
        case REQUEST(ACTION_TYPES.XOA_DON_DE_XUAT):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DDX):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_BN):
        case FAILURE(ACTION_TYPES.LAY_DON_DE_XUAT):
        case FAILURE(ACTION_TYPES.TAO_DON_DE_XUAT):
        case FAILURE(ACTION_TYPES.CAP_NHAT_DON_DE_XUAT):
        case FAILURE(ACTION_TYPES.XOA_DON_DE_XUAT):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_DDX):
            return {
                ...state,
                loading: false,
                danhSachDonDeXuat: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_BN):
            return {
                ...state,
                loading: false,
                danhSachBenhNhan: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_DON_DE_XUAT):
            return {
                ...state,
                loading: false,
                donDeXuat: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_DON_DE_XUAT):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_DON_DE_XUAT):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                donDeXuat: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_DON_DE_XUAT):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                donDeXuat: defaultValue
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

const apiUrl = 'http://localhost:8080/quanlyxuatan/api/';

// Actions
export const getDanhSachDonDeXuat: ICrudGetAllAction<IDonDeXuat> = (page, size, sort) => {
    const requestUrl = `${apiUrl}don-de-xuat/lay-danh-sach-don-de-xuat${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DDX,
        payload: axios.get<IDonDeXuat>(requestUrl)
    };
};

export const getDanhSachBenhNhan: ICrudGetAllAction<IBenhNhan> = (page, size, sort) => {
    const requestUrl = `${apiUrl}don-de-xuat/lay-danh-sach-benh-nhan${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_BN,
        payload: axios.get<IBenhNhan>(requestUrl)
    };
};

export const getDonDeXuat: ICrudGetAction<IDonDeXuat> = ma_don => {
    const requestUrl = `${apiUrl}don-de-xuat/lay-don-de-xuat`;
    return {
        type: ACTION_TYPES.LAY_DON_DE_XUAT,
        payload: axios.get<IDonDeXuat>(requestUrl, { params : { maDon: ma_don } })
    };
};

export const addDonDeXuat: ICrudPutAction<IDonDeXuat> = dondexuat => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_DON_DE_XUAT,
        payload: axios.post(`${apiUrl}don-de-xuat/them-moi-don-de-xuat`, dondexuat)
    });
    dispatch(getDanhSachDonDeXuat());
    return result;
};

export const updateDonDeXuat: ICrudPutAction<IDonDeXuat> = dondexuat => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_DON_DE_XUAT,
        payload: axios.post(`${apiUrl}don-de-xuat/cap-nhat-don-de-xuat`, dondexuat)
    });
    dispatch(getDanhSachDonDeXuat());
    return result;
};

export const deleteDonDeXuat: ICrudDeleteAction<IDonDeXuat> = ma_don => async dispatch => {
    const requestUrl = `${apiUrl}don-de-xuat/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_DON_DE_XUAT,
        payload: axios.delete(requestUrl, { params: { maDon: ma_don } })
    });
    dispatch(getDanhSachDonDeXuat());
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
