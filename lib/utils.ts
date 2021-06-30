import _ from 'lodash';

export function generateClientMutationId(): string {
  return _.times(10, () => _.random(35).toString(36)).join('');
}
