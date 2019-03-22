package vn.edu.tgu.dao;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.edu.tgu.obj.DonDeXuatObj;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class DonDeXuatDAOImp implements DonDeXuatDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachDonDeXuat() {
        String sql = "CALL DanhSachDonDeXuat()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List getDanhSachBenhNhan() {
        String sql = "CALL DanhSachBenhNhan()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public DonDeXuatObj getDonDeXuat(long maDon) {
        String sql = "CALL LayDonDeXuatTuMaDon(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List tmp = jdbcTemplate.queryForList(sql,new Object[] {maDon});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        DonDeXuatObj donDeXuatObj = new DonDeXuatObj();
        donDeXuatObj.MA_DON = Long.parseLong(map.get("MA_DON").toString());
        donDeXuatObj.MA_BENH_NHAN = Long.parseLong(map.get("MA_BENH_NHAN").toString());
        donDeXuatObj.LI_DO = map.get("LI_DO").toString();
        donDeXuatObj.CHE_DO_AN = Long.parseLong(map.get("CHE_DO_AN").toString());
        donDeXuatObj.SO_PHIEU_LAN_1 = Long.parseLong(map.get("SO_PHIEU_LAN_1").toString());
        donDeXuatObj.SO_PHIEU_LAN_2 = Long.parseLong(map.get("SO_PHIEU_LAN_2").toString());
        donDeXuatObj.SO_PHIEU_LAN_3 = Long.parseLong(map.get("SO_PHIEU_LAN_3").toString());
        donDeXuatObj.TINH_TRANG_DUYET = Long.parseLong(map.get("TINH_TRANG_DUYET").toString());
        donDeXuatObj.NGAY_LAP = map.get("NGAY_LAP").toString();
        donDeXuatObj.NGAY_DUYET = map.get("NGAY_DUYET").toString();
        return donDeXuatObj;
    }

    @Override
    public void addDonDeXuat(DonDeXuatObj obj) {
        try {
            String sql = "CALL ThemDonDeXuat(?,?,?,?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.MA_BENH_NHAN,
                obj.LI_DO,
                obj.CHE_DO_AN,
                obj.SO_PHIEU_LAN_1,
                obj.SO_PHIEU_LAN_2,
                obj.SO_PHIEU_LAN_3,
                obj.TINH_TRANG_DUYET,
                obj.NGAY_LAP,
                obj.NGAY_DUYET
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateDonDeXuat(DonDeXuatObj obj) {
        try {
            String sql = "CALL CapNhatDonDeXuat(?,?,?,?,?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.MA_DON,
                obj.MA_BENH_NHAN,
                obj.LI_DO,
                obj.CHE_DO_AN,
                obj.SO_PHIEU_LAN_1,
                obj.SO_PHIEU_LAN_2,
                obj.SO_PHIEU_LAN_3,
                obj.TINH_TRANG_DUYET,
                obj.NGAY_LAP,
                obj.NGAY_DUYET
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteDonDeXuat(long maDon) {
        String sql = "CALL XoaDonDeXuat(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maDon);
        }
        catch (Exception e) {
            throw e;
        }
    }
}
