const { Product } = require("../models");
const DB_Define = require("../utils/DB_Define");
const moment = require("moment");
const product = new Product();

const addProduct = async function (obj) {
  return product.addProduct(obj);
};

const getProductByID = async function (id) {
  const pro = await product.getProductByID(id);
  if (pro[0]["HinhAnh"]) {
    pro[0]["HinhAnh"] = process.env.URL + "" + pro[0]["HinhAnh"];
  }
  return pro;
};
const getProductByName = async function (name) {
  let obj = await product.getProductByName(name);
  for await (const element of obj) {
    if (element["HinhAnh"]) {
      element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
    }
  }
  return obj;
};
const getProductByIDDanhMuc = async function (idcategory, page, size) {
  try {
    const data = await product.getProductByIDDanhMuc(idcategory, page, size);
    if (data.length === 0) {
      throw new Error("Page Not Found");
    }
    for await (const element of data) {
      if (element["HinhAnh"]) {
        element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
      }
    }
    const amount = await product.countAll(DB_Define.Product);
    const amountPage = Math.ceil(amount[0].soluong / size);
    return {
      DanhSach: data,
      TongSanPham: amount[0].soluong,
      SoLuongTrang: amountPage,
    };
  } catch (error) {
    throw error;
  }
};
const getProductByIDTheLoai = async function (idTheloai, page, size) {
  try {
    const data = await product.getProductByIDTheloai(idTheloai, page, size);
    if (data.length === 0) {
      throw new Error("Page Not Found");
    }
    for await (const element of data) {
      if (element["HinhAnh"]) {
        element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
      }
    };
    const amount = await product.countAllByID(
      DB_Define.Product,
      "IDTheLoai",
      idTheloai
    );
    const amountPage = Math.ceil(amount[0].soluong / size);
    return {
      DanhSach: data,
      TongSanPham: amount[0].soluong,
      SoLuongTrang: amountPage,
    };
  } catch (error) {
    throw error;
  }
};
const getAllProductByIDTheLoai = async function (id) {
  const obj = await product.getAllProductByIDTheLoai(id);
  for await (const element of obj) {
    if (element["HinhAnh"]) {
      element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
    }
  };
  return obj;
};

const getProductByIDNhaXuatBan = async function (id) {
  let obj = await product.getProductByIDNhaXuatBan(id);
  for await (const element of obj) {
    if (element["HinhAnh"]) {
      element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
    }
  };
  return obj;
};

const getAllProduct = async function () {
  let obj = await product.getAllProduct();
  for await (const element of obj) {
    if (element["HinhAnh"]) {
      element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
    }
  };
  return obj;
};
const deleteProductByID = async function (ID) {
  try {
    const data = await getProductByID(ID);
    if (data.length == 0) throw new Error("ID not Found");
    return product.hideProuct(ID);
  } catch (error) {
    throw error;
  }
};
const updateProductByID = async function (ID, obj) {
  try {
    const data = await getProductByID(ID);
    if (data.length == 0) throw new Error("ID not Found");
    return product.updateData(DB_Define.Product, "IDSanPham", obj, ID);
  } catch (error) {
    throw error;
  }
};
const getNewProduct = async function () {
  let obj = await product.getNewProduct();
  for await (const element of obj) {
    if (element["HinhAnh"]) {
      element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
    }
  };
  return obj;
};
const getBestSeller = async function () {
  let obj = await product.getBestseller();
  for await (const element of obj) {
    if (element["HinhAnh"]) {
      element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
    }
  };
  return obj;
};
const getTopTenBestsellerPerDay = async function () {
  let day = moment().isoWeekday(1).format("YYYY-MM-DD");
  let obj = await product.getTopTenBestsellerPerDay(day);
  for await (const element of obj) {
    if (element["HinhAnh"]) {
      element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
    }
  };
  return obj;
};

const getProductPagination = async function (page, size) {
  try {
    const data = await product.getProductPagination(page, size);
    if (data.length === 0) {
      throw new Error("Page Not Found");
    }
    for await (const element of data) {
      if (element["HinhAnh"]) {
        element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
      }
    };
    const amount = await product.countAll(DB_Define.Product);
    const amountPage = Math.ceil(amount[0].soluong / size);
    return {
      DanhSach: data,
      TongSanPham: amount[0].soluong,
      SoLuongTrang: amountPage,
    };
  } catch (error) {
    throw error;
  }
};
const filter = async function (c = "", k = "", d = "", page, size) {
  try {
    let filter = "";
    if (c !== "" && k !== "" && d !== "") {
      filter = `and danhmuc.IDDanhMuc = ${c} and theloai.IDTheLoai = ${k} and sanpham.NgayThem BETWEEN "${d}" AND CURRENT_DATE`;
    } else if (c !== "" && k !== "" && d == "") {
      filter = `and danhmuc.IDDanhMuc = ${c} and theloai.IDTheLoai = ${k}`;
    } else if (c !== "" && k == "" && d !== "") {
      filter = `and danhmuc.IDDanhMuc = ${c} and sanpham.NgayThem BETWEEN "${d}" AND CURRENT_DATE`;
    } else if (c == "" && k !== "" && d !== "") {
      filter = `and theloai.IDTheLoai = ${k} and sanpham.NgayThem BETWEEN "${d}" AND CURRENT_DATE`;
    } else if (c !== "" && k == "" && d == "") {
      filter = `and danhmuc.IDDanhMuc = ${c}`;
    } else if (c == "" && k !== "" && d == "") {
      filter = `and theloai.IDTheLoai = ${k}`;
    } else if (c == "" && k == "" && d !== "") {
      filter = `and sanpham.NgayThem BETWEEN "${d}" AND CURRENT_DATE`;
    }
    const data = await product.filter(filter, page, size);
    if (data.length === 0) {
      throw new Error("Page Not Found");
    }
    for await (const element of data) {
      if (element["HinhAnh"]) {
        element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
      }
    }
    const amount = await product.countFilter(filter);
    const amountPage = Math.ceil(amount[0].soluong / size);
    return {
      DanhSach: data,
      TongSanPham: amount[0].soluong,
      SoLuongTrang: amountPage,
    };
  } catch (error) {
    throw error;
  }
};
const filterByName = async function (name) {
  let obj = await product.filterByName(name);
  for await (const element of obj) {
    if (element["HinhAnh"]) {
      element["HinhAnh"] = process.env.URL + "" + element["HinhAnh"];
    }
  };
  return obj;
};
module.exports = {
  getNewProduct,
  addProduct,
  getAllProduct,
  getProductByID,
  deleteProductByID,
  updateProductByID,
  getProductByIDDanhMuc,
  getProductByIDTheLoai,
  getProductByIDNhaXuatBan,
  getBestSeller,
  getTopTenBestsellerPerDay,
  getProductPagination,
  getProductByName,
  filter,
  getAllProductByIDTheLoai,
  filterByName,
};
