import TYPES from '@core/types';
import FinancialController from './controllers/financial.controller';
import FinancialService from './services/financial.service';
import FinancialRepository from './repositories/financial.repository';
import { ContainerModule } from 'inversify';

const financialModule = new ContainerModule(bind => {
	bind(TYPES.FINANCIAL_CONTROLLER).to(FinancialController).inSingletonScope();
	bind(TYPES.FINANCIAL_SERVICE).to(FinancialService).inSingletonScope();
	bind(TYPES.FINANCIAL_REPOSITORY).to(FinancialRepository).inSingletonScope();
});

export default financialModule;
