module.exports = {
  pagination: (res, query, response) => {
    const page = response.current_page;
    const { limit } = response;
    const totalData = response.total_data;
    const { path } = response;
    const totalPage = Math.ceil(totalData / limit);
    let queryString = '';
    Object.keys(query).forEach((key) => {
      if (key !== 'page') {
        queryString += `&&${key}=${query[key]}`;
      }
    });
    const prevLink = (page !== 1 ? `${path}=${page - 1}${queryString}` : null);
    const nextLink = (page !== totalPage ? `${path}=${page + 1}${queryString}` : null);

    const resultPrint = {
      current_page: response.current_page || null,
      offset: response.offset || null,
      limit: response.limit || null,
      total_data: response.total_data || 0,
      total_page: totalPage || 0,
      prev_link: prevLink,
      next_link: nextLink,
      message: response.message || null,
      status: response.status || 500,
      err: response.err || null,
      data: response.data || null,
    };
    return res.status(resultPrint.status).json(resultPrint);
  },
  helpers: (res, response) => res.status(response.status).json({
    status: response.status || 500,
    message: response.message || null,
    data: response.data || null,
    err: response.err || null,
  }),
};
