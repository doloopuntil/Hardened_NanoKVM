import { theme } from 'antd';

// Tooltips are drawn in antd's spotlight colour; a Popconfirm only matches them when it is given
// that same colour (the `color` prop paints the card and its arrow).
export function usePopconfirmColor() {
  return theme.useToken().token.colorBgSpotlight;
}
