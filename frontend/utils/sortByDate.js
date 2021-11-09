const sortByDate = (a, b) => {
  if (a.sermonDate < b.sermonDate) {
    return 1;
  }
  if (a.sermonDate > b.sermonDate) {
    return -1;
  }
  return 0;
};

export default sortByDate;
