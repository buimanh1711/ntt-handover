const { PAGE_SIZE } = require("../configs/constants");

const getPage = (page) => {
  if (page < 0) return {};
  page = parseInt(page);
  let skip = (page - 1) * PAGE_SIZE;
  let limit = PAGE_SIZE;

  return {
    skip,
    limit,
  };
};

module.exports = getPage;
