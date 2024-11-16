const dateConverter = (longDate) => {
  const date = new Date(longDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export default dateConverter;
