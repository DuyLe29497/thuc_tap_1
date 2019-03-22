package vn.edu.tgu.dao;

import vn.edu.tgu.obj.DonDeXuatObj;

import java.util.List;

public interface DonDeXuatDAO {
    public List getDanhSachDonDeXuat();
    public List getDanhSachBenhNhan();
    public void addDonDeXuat(DonDeXuatObj obj);
    public void updateDonDeXuat(DonDeXuatObj obj);
    public void deleteDonDeXuat(long maDon);
    public DonDeXuatObj getDonDeXuat(long maDon);
}
