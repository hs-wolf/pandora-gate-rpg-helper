import dev from './environment.dev';
import prod from './environment.prod';

export default import.meta.env.MODE === 'development' ? dev : prod;
