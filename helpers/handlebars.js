module.exports = {

  if_file: (type, options) => {
    if(type == "file") {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
  if_folder: (type, options) => {
    if(type == "folder") {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }
}
