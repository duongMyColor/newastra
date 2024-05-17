import { Hono } from 'hono';
import applicationMaster from './application-master';
import acsta from './acsta';
import product from './product';
import license from './license';
import termsOfUse from './terms-of-use';
const app = new Hono();

app.route('/application-masters', applicationMaster);
app.route('/acstas', acsta);
app.route('/products', product);
app.route('/terms-of-uses', termsOfUse);
app.route('/licenses', license);

export default app;
