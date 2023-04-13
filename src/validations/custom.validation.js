const MatKhau = (value, helpers) => {
    if (value.length < 8) {
      return helpers.message('password must be at least 8 characters');
    }
    if (!value.match(/\d/) || !value.match(/[A-Z]/)|| !value.match(/[a-z]/)) {
      return helpers.message('password must contain at least 1 lowercase and uppercase letter and 1 number');
    }
    return value;
  };
module.exports = {
 MatKhau,
}