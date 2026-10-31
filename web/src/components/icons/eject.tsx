import { IconBase, type IconProps } from './icon-base.tsx';

// The eject symbol, drawn like the lucide icons; the installed lucide-react has none.
export const Eject = (props: IconProps) => {
  return (
    <IconBase {...props}>
      <path d="M12 5 4.5 14h15z" />
      <path d="M5 18.5h14" />
    </IconBase>
  );
};
