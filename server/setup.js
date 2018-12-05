module.exports = (app) => {
  app.listen(process.env.PORT || 3000, () => console.log('Server listen into 3000'));
};
