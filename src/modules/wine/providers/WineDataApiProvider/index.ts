import { container } from 'tsyringe';
import { IWineDataApiProvider } from './models/IWineDataApiProvider';
import WineDataApiProvider from './implementations/WineDataApiProvider';

container.registerSingleton<IWineDataApiProvider>(
  'WineDataApiProvider',
  WineDataApiProvider
);
