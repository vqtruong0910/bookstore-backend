const { productService } = require("../services");
const httpStatus = require("http-status");
const Response = require("../utils/Response");
const Uploader = require('../middlewares/Uploader');
const fs = require('fs');
const { number } = require("joi");

const addProduct = async function (req, res) {
  try {
    var upload = Uploader.single("HinhAnh");
    upload(req, res, async function (err) {
      if (err) return res.status(httpStatus.BAD_REQUEST).json(new Response(true, err.message));
      if (!req.file) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true, 'No file!'));
      }
      let src = req.file.path.split('\\').join('/');
      const name = await productService.getProductByName(req.body.TenSanPham);
      if (name.length !== 0) {
        fs.unlink(src, (err) => {
          if (err) console.log(err);
        })
        return res.status(httpStatus.BAD_REQUEST).json({
          error: true, message: "Sản phẩm đã tồn tại"
        });
      }
      let obj = req.body;
      obj["HinhAnh"] = src;
      console.log(obj);

      await productService.addProduct(obj);
      return res.status(httpStatus.CREATED).send(new Response(false, "create"));
    });
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
};

const getNewProduct = async function (req, res) {
  try {
    const product = await productService.getNewProduct();
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
const getBestSeller = async function (req, res) {
  try {
    const product = await productService.getBestSeller();
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
const getTopTenBestsellerPerDay = async function (req, res) {
  try {
    const product = await productService.getTopTenBestsellerPerDay();
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
const getProductByID = async function (req, res) {
  try {
    const id = req.params.ID;
    const product = await productService.getProductByID(id);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};
const getProductByIDDanhMuc = async function (req, res) {
  try {

    const { c, p, s } = req.query;
    const product = await productService.getProductByIDDanhMuc(c, p, s);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};

const getProductByIDTheLoai = async function (req, res) {
  try {
    const { k, p, s } = req.query;
    const product = await productService.getProductByIDTheLoai(k, p, s);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};
const getAllProductByIDTheLoai = async function (req, res) {
  try {
    const id = req.params.ID;
    const product = await productService.getAllProductByIDTheLoai(id);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};

const getProductByIDNhaXuatBan = async function (req, res) {
  try {
    const id = req.params.ID;
    const product = await productService.getProductByIDNhaXuatBan(id);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};

const getAllProduct = async function (req, res) {
  try {
    const product = await productService.getAllProduct();
    console.log(product);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};

const deleteProductByID = async function (req, res) {
  try {
    const ID = req.params.ID;
    await productService.deleteProductByID(ID);
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};
const updateProductByID = async function (req, res) {
  try {
    var upload = Uploader.single("HinhAnh");
    upload(req, res, async function (err) {
      if (err) return res.status(httpStatus.BAD_REQUEST).json(new Response(true, err.message));
      let id = req.params.ID;
      let obj = req.body;
      if (!req.file) {
        const data = await productService.getProductByID(id);
        const urloldimage = data[0].HinhAnh;
        obj["HinhAnh"] = urloldimage;
      }
      else {
        let src = req.file.path.split('\\').join('/');
        const data = await productService.getProductByID(id);
        const urloldimage = data[0].HinhAnh;
        if (urloldimage !== null) {
          fs.unlink(urloldimage, (err) => {
            if (err) console.log(err);
          })
        }
        obj["HinhAnh"] = src;
      }
      try {
        await productService.updateProductByID(id, obj);
      } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error.message);
      }
      return res.status(httpStatus.CREATED).send(new Response(false, "update success"));
    });
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
};
const getProductPagination = async function (req, res) {
  try {
    const page = req.query.p;
    const size = req.query.s;
    const data = await productService.getProductPagination(page, size);
    return res.status(httpStatus.OK).json(new Response(false, "", data));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
const filter = async function (req, res) {
  console.log("ok");
  try {
    const { c = "", k = "", d = "", p, s } = req.query;
    const data = await productService.filter(c, k, d, p, s);

    return res.status(httpStatus.OK).json(new Response(false, "", data));
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
}

const filterByName = async function (req, res) {
  try {
    const name = req.query.name;
    console.log(name);
    const product = await productService.filterByName(name);
    console.log(product);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
module.exports = {
  addProduct,
  getNewProduct,
  getProductByID,
  getAllProduct,
  deleteProductByID,
  updateProductByID,
  getProductByIDDanhMuc,
  getProductByIDTheLoai,
  getProductByIDNhaXuatBan,
  getBestSeller,
  getTopTenBestsellerPerDay,
  getProductPagination,
  filter,
  getAllProductByIDTheLoai,
  filterByName,
}
