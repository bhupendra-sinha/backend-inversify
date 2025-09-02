import TYPES from '@core/types';
import { ContainerModule } from 'inversify';
import BusinessService from './services/business_details.service';
import BusinessRepository from './repositories/business_details.repository';
import BusinessDetailsController from './controllers/business_details.controller';

const businessModule = new ContainerModule(bind => {
	bind(TYPES.BUSINESS_CONTROLLER).to(BusinessDetailsController).inSingletonScope();
	bind(TYPES.BUSINESS_SERVICE).to(BusinessService).inSingletonScope();
	bind(TYPES.BUSINESS_REPOSITORY).to(BusinessRepository).inSingletonScope();
});

export default businessModule;
