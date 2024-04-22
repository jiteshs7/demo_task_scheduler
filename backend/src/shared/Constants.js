exports.REGEX = Object.freeze({
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  FULL_NAME: /^[a-zA-Z ]*$/,
});

exports.PRIORITY = Object.freeze({
  HIGH: 2,
  MEDIUM: 1,
  LOW: 0,
});

exports.STATUS = Object.freeze({
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  DELETED: 3,
});
