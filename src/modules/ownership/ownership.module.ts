import { ContainerModule } from 'inversify';
import TYPES from '@core/types';
import OwnershipController from './controllers/ownership.controller';
import OwnershipService from './services/ownership.service';
import OwnershipRepository from './repositories/ownership.repository';

const ownershipModule = new ContainerModule(bind => {
	bind(TYPES.OWNERSHIP_CONTROLLER).to(OwnershipController).inSingletonScope();
	bind(TYPES.OWNERSHIP_SERVICE).to(OwnershipService).inSingletonScope();
	bind(TYPES.OWNERSHIP_REPOSITORY).to(OwnershipRepository).inSingletonScope();
});

export default ownershipModule;
