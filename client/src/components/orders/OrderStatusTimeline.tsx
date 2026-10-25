import { orderStatuses, type OrderStatus } from '@shared/config';

const steps: OrderStatus[] = [
  'PENDING',
  'PREPARING',
  'READY',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
];

export const OrderStatusTimeline = ({ status }: { status: OrderStatus }) => {
  if (status === 'CANCELLED') {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
        {orderStatuses.CANCELLED.ar}
      </div>
    );
  }

  const currentStep = orderStatuses[status].step;

  return (
    <div className="grid grid-cols-5 gap-1">
      {steps.map((step) => {
        const meta = orderStatuses[step];
        const reached = meta.step <= currentStep;
        const active = meta.step === currentStep;
        return (
          <div key={step} className="relative flex flex-col items-center gap-2 text-center">
            {meta.step < 5 ? (
              <span
                className="absolute top-4 right-[-50%] h-0.5 w-full"
                style={{
                  backgroundColor:
                    currentStep > meta.step ? '#0f3d2e' : '#e4c184',
                }}
              />
            ) : null}
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
                reached
                  ? 'border-emerald-deep bg-emerald-deep text-white'
                  : 'border-sand-300 bg-white text-night/35'
              } ${active ? 'ring-4 ring-gold/20' : ''}`}
            >
              {reached && !active ? '✓' : meta.step}
            </span>
            <span
              className={`text-[10px] font-bold leading-4 sm:text-xs ${
                reached ? 'text-emerald-deep' : 'text-night/35'
              }`}
            >
              {meta.ar}
            </span>
          </div>
        );
      })}
    </div>
  );
};
