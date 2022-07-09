import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express';
import cors, { CorsOptions } from 'cors';
import { generateHTML, serve } from 'swagger-ui-express';
import { RegisterRoutes } from '../routes/routes';
import { ValidateError } from '@tsoa/runtime';
import { ApiError } from '@pandora-gate-rpg-helper/models';

const app = express();
const options: CorsOptions = {
  origin: '*',
  methods: '*',
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(options));

app.use('/docs', serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    generateHTML(await import('../spec/swagger.json'), { isExplorer: true })
  );
});

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught validation error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation failed.',
      details: err?.fields,
    });
  }
  if (err instanceof ApiError) {
    return res.status(err.status ?? err.code).json(err.toMap());
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: err?.message ?? 'Internal server error.',
    });
  }
  next();
});

RegisterRoutes(app);

export default app;
