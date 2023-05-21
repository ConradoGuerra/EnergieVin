import { Router } from 'express';

import wines from '@modules/wine/infra/http/wines.routes';
import users from '@modules/user/infra/http/users.routes';
import evaluations from '@modules/evaluations/infra/http/evaluations.routes';

const routes = Router();

routes.use('/wines', wines);
routes.use('/users', users);
routes.use('/evaluations', evaluations);

export default routes;
