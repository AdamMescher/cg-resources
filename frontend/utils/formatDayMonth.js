const formatDayMonth = (date) => {
  const day = date.split('-')[2].replace(/^0*(.+)/, '$1');
  const month = date.split('-')[1];
  const months = Array.from({ length: 12 }, (item, i) => {
    return new Date(0, i).toLocaleString('en-US', { month: 'long' });
  });

  return `${months[parseInt(month) - 1]} ${day}`;
};

export default formatDayMonth;
