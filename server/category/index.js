const controller = require('./category.controller.js');

module.exports = (Router) => {
  const router = Router();

  router.get('/', controller.get);
  router.get('/:id', controller.byId);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.remove);

  return router;
};
