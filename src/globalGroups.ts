import { defineGkdGlobalGroups } from '@gkd-kit/define';
import * as appList from './globalDefaultApps';

export const OPEN_AD_ORDER = -10; // 开屏广告
export const UPDATE_PROMPT_ORDER = -9; // 更新提示
export const YOUTH_MODE_ORDER = -8; // 青少年模式

export default defineGkdGlobalGroups([
  {
    key: 0,
    name: '开屏广告-全局',
    desc: '关闭打开应用时的开屏广告',
    order: OPEN_AD_ORDER,
    fastQuery: true,
    matchTime: 3000,
    actionMaximum: 2,
    resetMatch: 'app',
    actionCdKey: 0,
    actionMaximumKey: 0,
    priorityTime: 3000,
    rules: [
      {
        key: 0,
        // 防止在应用的搜索页面误触
        excludeMatches:
          '[text*="搜索" || text^="猜你" || text="历史记录" || text$="在搜"][text.length>3 && text.length<6][visibleToUser=true]',
        matches: '[text*="跳过"][text.length<10][visibleToUser=true]',
      },
      {
        key: 1,
        // 防止在应用的搜索页面误触
        excludeMatches:
          '[text*="搜索" || text^="猜你" || text="历史记录" || text$="在搜"][text.length>3 && text.length<6][visibleToUser=true]',
        matches:
          '[childCount=0][visibleToUser=true][(text.length<10 && (text*="跳过" || text*="跳過" || text~="(?is).*skip.*")) || (vid~="(?is).*skip.*" && text!="帮助" && text!="取消") || id$="tt_splash_skip_btn" || (desc.length<10 && (desc*="跳过" || desc*="跳過" || desc~="(?is).*skip.*"))]',
        excludeSnapshotUrls: [
          // 避免误触
          'https://i.gkd.li/i/17108010', // text!="帮助"
          'https://i.gkd.li/i/18265000', // text!="取消"
        ],
      },
      {
        key: 2,
        action: 'clickCenter',
        matches:
          'FrameLayout > FrameLayout[childCount>2] > @View[clickable=true][text=null][visibleToUser=true] + TextView[visibleToUser=true][text=null][index=parent.childCount.minus(1)]', // 字节SDK
      },
    ],
    apps: [...appList.openAdBlackListAppIDs]
      .map((id) => ({ id, enable: false }))
      .concat(
        [...appList.openAdWhiteListAppIDs].map((id) => ({ id, enable: true })),
      ),
  },
]);
