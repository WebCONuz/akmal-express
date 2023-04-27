const isLoginDate = (date) => {
  return new Date(date).getTime() - new Date().getTime() > 0;
};

export { isLoginDate };
