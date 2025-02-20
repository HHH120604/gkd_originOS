import { defineGkdSubscription } from '@gkd-kit/define';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups from './globalGroups';

export default defineGkdSubscription({
  id: 120604,
  name: 'gkd_originOS',
  version: 0,
  author: 'HHH1206',
  checkUpdateUrl: './gkd_originOS.version.json5',
  supportUri: 'https://github.com/HHH120604/gkd_originOS',
  categories,
  globalGroups,
  apps: await batchImportApps(`${import.meta.dirname}/apps`),
});
