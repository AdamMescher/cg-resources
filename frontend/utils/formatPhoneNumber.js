String.prototype.insert = function (index, string) {
  if (index > 0) {
    return this.substring(0, index) + string + this.substr(index);
  }
  return string + this;
};

const formatPhoneNumber = (num) => {
  return num
    .toString()
    .insert(0, '(')
    .insert(4, ')')
    .insert(5, ' ')
    .insert(9, '-');
};

export default formatPhoneNumber;
