import TYPES from '@core/types';
import { ContainerModule } from 'inversify';
import BusinessService from './services/business_details.service';
import BusinessRepository from './repositories/business_details.repository';
import BusinessDetailsController from './controllers/business_details.controller';
import BusinessAddressController from './controllers/business_address.controller';
import BusinessAddressService from './services/business_address.service';
import BusinessAddressRepository from './repositories/business_address.repository';

const businessModule = new ContainerModule(bind => {
	bind(TYPES.BUSINESS_CONTROLLER).to(BusinessDetailsController).inSingletonScope();
	bind(TYPES.BUSINESS_SERVICE).to(BusinessService).inSingletonScope();
	bind(TYPES.BUSINESS_REPOSITORY).to(BusinessRepository).inSingletonScope();

	bind(TYPES.BUSINESS_ADDRESS_CONTROLLER).to(BusinessAddressController).inSingletonScope();
	bind(TYPES.BUSINESS_ADDRESS_SERVICE).to(BusinessAddressService).inSingletonScope();
	bind(TYPES.BUSINESS_ADDRESS_REPOSITORY).to(BusinessAddressRepository).inSingletonScope();
});

export default businessModule;
