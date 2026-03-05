import { Logger } from '@thanhhoajs/logger';

import { appConfig, appValidator } from './app.config';

const logger = Logger.get('CONFIGS');

export const runValidators = async () => {
  try {
    // Add more validators here
    const isValid = appValidator(appConfig);
    const errors = appValidator.errors;

    if (!isValid && errors && errors.length > 0) {
      logger.error('Validation errors:');
      logger.trace(errors);
    } else {
      logger.success('All configurations are valid!');
    }
  } catch (error) {
    logger.error('An error occurred during validation:\n', error);
    process.exit(1);
  }
};
