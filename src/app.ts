import 'dotenv-safe/config';
import createServer from '@src/server';
import connectToMongoDB from '@src/data-access';
import log from '@src/utils/logger';

const startServer = () => {
  const app = createServer();
  const port: number = parseInt(<string>process.env.SERVER_PORT, 10) || 5000;
  app.listen(port, () => {
    log.info(`server running on port ${port}`);
    connectToMongoDB();
  });
  return app;
};

export default startServer();
