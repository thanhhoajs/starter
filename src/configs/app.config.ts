import Ajv from 'ajv';

const ajv = new Ajv();
const appValidator = ajv.compile({
  type: 'object',
  properties: {
    port: { type: 'number', minimum: 0, maximum: 65535 },
  },
  required: ['port'],
});
const appConfig = {
  port: Number(process.env.PORT) || 3000,
};

export { appConfig, appValidator };
