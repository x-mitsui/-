module.exports = {
  LOGIN: {
    INVALID_USERNAME_LENGTH: {
      err_code: 10001,
      err_msg: 'Invalid username length'
    },
    INVALID_PASSWORD_LENGTH: {
      err_code: 10002,
      err_msg: 'Invalid password length'
    },
    USERNAME_NOT_EXIST: {
      err_code: 10003,
      err_msg: 'Username is not exist in database.'
    },
    PASSWORD_ERROR: {
      err_code: 10004,
      err_msg: "Password doesn't match the username."
    },
    INVALID_OPERATION: {
      err_code: 10005,
      err_msg: "Username or password can't be null."
    },
    NOT_LOGIN_STATUS: {
      err_code: 10006,
      err_msg: 'It is not logined status.'
    },
    LOGIN_STATUS: {
      err_code: 10007,
      err_msg: 'It is logined status.'
    },
    LOGOUT_SUCCESS: {
      err_code: 0,
      err_msg: 'Logout successfully.'
    },
    SUCCESS: {
      err_code: 0,
      err_msg: 'Login is OK.'
    }
  },
  API: {
    GET_DATA_SUCCESS: {
      err_code: 0,
      err_msg: 'Get the data successfully.'
    },
    GET_DATA_FAILED: {
      err_code: 20001,
      err_msg: 'Failed to get the data.'
    },
    CHANGE_COURSE_FIELD_SUCCESS: {
      err_code: 0,
      err_msg: 'Update the course field successfully.'
    },
    CHANGE_COURSE_FIELD_FAILED: {
      err_code: 20002,
      err_msg: 'Failed to change the course field.'
    },
    CHANGE_STATUS_SUCCESS: {
      err_code: 0,
      err_msg: 'Update status successfully.'
    },
    CHANGE_STATUS_FAILED: {
      err_code: 20003,
      err_msg: 'Failed to change the status.'
    }
  },
  CRAWLER: {
    CRAWL_DATA_SUCCESS: {
      err_code: 0,
      err_msg: 'Crawl data successfully.'
    },
    CRAWL_DATA_FAILED: {
      err_code: 30001,
      err_msg: 'Failed to crawl the data.'
    }
  }
}
