import { LuCircleAlert, LuCircleCheck, LuInfo } from 'react-icons/lu';
import { useToasts } from '../../lib/toast';
import './Toaster.css';

const ICONS = { success: LuCircleCheck, error: LuCircleAlert, info: LuInfo };

export function Toaster() {
  const toasts = useToasts();
  return (
    <div className="toaster" role="status" aria-live="polite">
      {toasts.map(({ id, message, tone }) => {
        const Icon = ICONS[tone] ?? LuInfo;
        return (
          <div key={id} className={`toast toast--${tone}`}>
            <Icon aria-hidden="true" />
            <span>{message}</span>
          </div>
        );
      })}
    </div>
  );
}
