import { store } from '../controllers/user.controller';

const routes = (app) => {
  app.route('/register')
    .post(store)
}
export default routes;