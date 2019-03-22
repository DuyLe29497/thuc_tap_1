package vn.edu.tgu.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.edu.tgu.dao.DonDeXuatDAO;
import vn.edu.tgu.obj.DonDeXuatObj;

import java.util.List;

@RestController
@RequestMapping("/api/")
@Api(value = "DonDeXuatController", description = "Danh mục đơn đề xuất Controller")
public class DonDeXuatController {
    @Autowired
    private DonDeXuatDAO donDeXuatDAO;

    @ApiOperation("Lấy danh sách đơn đề xuất")
    @RequestMapping(value = "don-de-xuat/lay-danh-sach-don-de-xuat", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachDonDeXuat()
    {
        return donDeXuatDAO.getDanhSachDonDeXuat();
    }

    @ApiOperation("Lấy danh sách bệnh nhân")
    @RequestMapping(value = "don-de-xuat/lay-danh-sach-benh-nhan", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachBenhNhan()
    {
        return donDeXuatDAO.getDanhSachBenhNhan();
    }

    @ApiOperation("Lấy đơn đề xuất")
    @RequestMapping(value = "don-de-xuat/lay-don-de-xuat", method = RequestMethod.GET)
    public @ResponseBody
    DonDeXuatObj getDonDeXuat(@RequestParam(value = "maDon", required = false) String maDon)
    {
        return donDeXuatDAO.getDonDeXuat(Long.parseLong(maDon));
    }

    @ApiOperation("Thêm đơn đề xuất")
    @RequestMapping(value = "don-de-xuat/them-moi-don-de-xuat", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addDonDeXuat(@RequestBody DonDeXuatObj ddx)
    {
        donDeXuatDAO.addDonDeXuat(ddx);
    }

    @ApiOperation("Cập nhật đơn đề xuất")
    @RequestMapping(value = "don-de-xuat/cap-nhat-don-de-xuat", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateDonDeXuat(@RequestBody DonDeXuatObj ddx)
    {
        donDeXuatDAO.updateDonDeXuat(ddx);
    }

    @ApiOperation("Xóa đơn đề xuất")
    @RequestMapping(value = "don-de-xuat/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteDonDeXuat(@RequestParam(value = "maDon") String maDon)
    {
        donDeXuatDAO.deleteDonDeXuat(Long.parseLong(maDon));
    }
}
