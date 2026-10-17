import { SquareKanbanIcon } from 'lucide-react';

import { updateScreen } from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { setGop as setCookie } from '@/lib/localstorage';
import { MenuOption } from '@/components/menu-rows.tsx';
import { MenuSubmenu } from '@/components/menu-submenu.tsx';

type GopProps = {
  gop: number;
  setGop: (gop: number) => void;
};

const gopList = [
  { key: 10, label: '10' },
  { key: 30, label: '30' },
  { key: 50, label: '50' },
  { key: 100, label: '100' }
];

export const Gop = ({ gop, setGop }: GopProps) => {
  async function update(value: number) {
    if (value === gop) return;

    const rsp = await attempt(() => updateScreen('gop', value));
    if (!rsp) return;

    setGop(value);
    setCookie(value);
  }

  const content = (
    <>
      {gopList.map((item) => (
        <MenuOption key={item.key} selected={item.key === gop} onClick={() => update(item.key)}>
          {item.label}
        </MenuOption>
      ))}
    </>
  );

  return <MenuSubmenu icon={<SquareKanbanIcon size={18} />} label="GOP" content={content} />;
};
