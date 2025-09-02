import TYPES from '@core/types';
import { ContainerModule } from 'inversify';
import { BusinessController } from './controllers/business.controller';
import BusinessService from './services/business.service';
import BusinessRepository from './repositories/business.repository';

const businessModule = new ContainerModule(bind => {
	bind(TYPES.BUSINESS_CONTROLLER).to(BusinessController).inSingletonScope();
	bind(TYPES.BUSINESS_SERVICE).to(BusinessService).inSingletonScope();
	bind(TYPES.BUSINESS_REPOSITORY).to(BusinessRepository).inSingletonScope();
});

export default businessModule;
