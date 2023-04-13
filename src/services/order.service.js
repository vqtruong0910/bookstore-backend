const { Order } = require("../models");
const product = require("./product.service");
const DB_Define = require("../utils/DB_Define");
const order = new Order();
const moment = require("moment");

//crud order
const createOrder = async function (obj) {
  try {
    return order.addData(DB_Define.Order, obj);
  } catch (error) {
    throw error;
  }
};

const getOrderByID = async function (ID) {
  try {
    return order.getOrderByID(ID);
  } catch (error) {
    throw error;
  }
};

const updateOrder = async function (obj, ID) {
  try {
    if (obj.TrangThai < -1 || obj.TrangThai > 3) {
      throw new Error("Trang thai don hang sai");
    }
    if (obj.TrangThai === 3) {
      const date = moment().format("YYYY-MM-DD");
      console.log(date);
      obj["NgayGiao"] = date;
    }
    return order.updateData(DB_Define.Order, "IDDonHang", obj, ID);
  } catch (error) {
    throw error;
  }
};

const deleteOrderByID = async function (ID) {
  try {
    return order.deleteData(DB_Define.Order, "IDDonHang", ID);
  } catch (error) {
    throw error;
  }
};

const getAllOrder = async function () {
  try {
    return order.getAllOrder();
  } catch (error) {
    throw error;
  }
};
const getOrderDetailByIDOrder = async function (ID) {
  try {
    const data = await order.getOrderDetailByIDOrder(ID);
    for await(const element of data) {
      if(element["HinhAnh"]){
        element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
      }
    };
    return data;
  } catch (error) {
    throw error;
  }
};

const createOrderDetail = async function (obj) {
  try {
    return order.addData(DB_Define.orderDetail, obj);
  } catch (error) {
    throw error;
  }
};

const getOrderDetailByID = async function (ID) {
  try {
    return order.getOne(DB_Define.orderDetail, "IDChiTietDonHang", ID);
  } catch (error) {
    throw error;
  }
};
const getOrderByIDUser = async function (ID) {
  try {
    return order.getOrderByIDUser(ID);
  } catch (error) {
    throw error;
  }
};
const updateOrderDetail = async function (obj, ID) {
  try {
    return order.updateData(DB_Define.orderDetail, "IDChiTietDonHang", obj, ID);
  } catch (error) {
    throw error;
  }
};

const deleteOrderDetailByID = async function (ID) {
  try {
    return order.deleteData(DB_Define.orderDetail, "IDChiTietDonHang", ID);
  } catch (error) {
    throw error;
  }
};

const getOrderDetail = async function () {
  try {
    return order.getAll(DB_Define.Order, "IDChiTietDonHang");
  } catch (error) {
    throw error;
  }
};

const addOrder = async function (obj) {
  try {
    const order = {
      IDNguoiDung: obj.IDNguoiDung,
      DiaChi: obj.DiaChi,
      PhiShip: obj.PhiShip,
      TrangThai: 0,
    };
    const orderDetail = obj.ChiTietDonHang;
    //kiem tra chi tiet don hang
    let error = false;
    for await (const element of orderDetail) {
      const id = element["IDSanPham"];
      const sanpham = await product.getProductByID(id);
      if (
        sanpham[0].SoLuongConLai < element["SoLuong"] ||
        sanpham[0].GiaBan !== element["GiaBan"]
      )
        error = true;
    }
    if (error === true)
      throw new Error(`product exceeds quantity or price of product change`);
    const data = await createOrder(order);
    orderDetail.forEach(async (element) => {
      element["IDDonHang"] = data.insertId;
      const id = element["IDSanPham"];
      const sanpham = await product.getProductByID(id);
      const soluong = sanpham[0].SoLuongConLai - element["SoLuong"];
      await product.updateProductByID(id, { SoLuongConLai: soluong });
      await createOrderDetail(element);
    });
  } catch (error) {
    console.log(error)
    throw error;
    
  }
};

const getRevanue = async function () {
  try {
    let date = moment().isoWeekday(1).format("YYYY-MM-DD");
    const data = await order.getRevanue(date);
    if (data[1].DoanhThu == 0) return { DoanhThu: data[0].DoanhThu, PhanTram: 100 };
    let percent;
    if(data[0].DoanhThu === data[1].DoanhThu){
      percent = 100;
    }else{
      percent = (data[0].DoanhThu / data[1].DoanhThu) * 100 - 100;
    }
    return { DoanhThu: data[0].DoanhThu, PhanTram: Math.round(percent) };
  } catch (error) {
    throw error;
  }
};
const getRevanuePerDay = async function () {
  try {
    let date = moment().isoWeekday(1).format("YYYY-MM-DD");
    const data = await order.getRevanuePerDay(date);
    return data;
  } catch (error) {
    throw error;
  }
};
const getAmount = async function () {
  try {
    let date = moment().isoWeekday(1).format("YYYY-MM-DD");
    console.log(date);
    const data = await order.getAmount(date);
    console.log(data);
    if(data[1].TongDon === 0) return {TongDon:data[0].TongDon,PhanTram:100};
    let percent;
    if(data[0].TongDon == data[1].TongDon){
      percent = 100;
    }else{
      percent = (data[0].TongDon / data[1].TongDon) * 100 - 100;
    }
    console.log({ TongDon: data[0].TongDon, PhanTram: Math.round(percent) });
    return { TongDon: data[0].TongDon, PhanTram: Math.round(percent) };
  } catch (error) {
    console.log(error)
    throw error;
  }
};
const getAmountPerDay = async function () {
  try {
    let date = moment().isoWeekday(1).format("YYYY-MM-DD");
    const data = await order.getAmountPerDay(date);
    return data;
  } catch (error) {
    throw error;
  }
};
const getOrderPagination = async function (page, size) {
  try {
    const data = await order.getOrderPagination(page, size);
    if (data.length === 0) {
      throw new Error("Page Not Found");
    }
    const amount = await order.countAll(DB_Define.Order);
    const amountPage = Math.ceil(amount[0].soluong / size);
    return {
      DanhSach: data,
      TongDon: amount[0].soluong,
      SoLuongTrang: amountPage,
    };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createOrder,
  getOrderByID,
  updateOrder,
  deleteOrderByID,
  getAllOrder,
  createOrderDetail,
  getOrderDetailByID,
  updateOrderDetail,
  deleteOrderDetailByID,
  getOrderDetail,
  addOrder,
  getOrderDetailByIDOrder,
  getRevanue,
  getAmount,
  getAmountPerDay,
  getOrderPagination,
  getRevanuePerDay,
  getOrderByIDUser,
};
