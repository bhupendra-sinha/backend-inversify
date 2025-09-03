import TYPES from '@core/types';
import OtherController from './controllers/other.controller';
import OtherService from './services/other.service';
import OtherRepository from './repositories/other.repository';
import { ContainerModule } from 'inversify';

const otherModule = new ContainerModule(bind => {
	bind(TYPES.OTHER_CONTROLLER).to(OtherController).inSingletonScope();
	bind(TYPES.OTHER_SERVICE).to(OtherService).inSingletonScope();
	bind(TYPES.OTHER_REPOSITORY).to(OtherRepository).inSingletonScope();
});

export default otherModule;
