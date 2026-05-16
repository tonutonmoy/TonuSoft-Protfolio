import app from './app';
import config from './config';
import seedSuperAdmin from './app/DB';

const port = Number(config.port) || 3008;

async function main() {
  try {
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Server is running on port ${port}`);
    await seedSuperAdmin();
  } catch (err) {
    console.error('❌ Error while starting server:', err);
    process.exit(1);
  }

  const exitHandler = () => {
    app.close().then(() => {
      console.info('🔌 Server closed!');
      process.exit(1);
    });
  };

  process.on('uncaughtException', err => {
    console.error('💥 Uncaught Exception:', err);
    exitHandler();
  });

  process.on('unhandledRejection', err => {
    console.error('💥 Unhandled Rejection:', err);
    exitHandler();
  });

  process.on('SIGTERM', () => {
    console.info('👋 SIGTERM received. Shutting down...');
    exitHandler();
  });
}

main();
