import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
export const databaseProviders = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async (): Promise<typeof mongoose> =>
    await mongoose.connect('mongodb://localhost/nest', {
      useNewUrlParser: true,
    }),
  };

// export const databaseProviders = [
//   {
//     provide: 'DATABASE_CONNECTION',
//     useFactory: async (): Promise<typeof mongoose> =>
//       await mongoose.connect('mongodb://localhost/nest', {
//         useNewUrlParser: true,
//       }),
//   },
// ];
