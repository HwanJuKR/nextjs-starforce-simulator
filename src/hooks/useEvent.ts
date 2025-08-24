import { useAtom } from 'jotai';
import { eventAtom, type IEvent } from '@/store/atoms';

export type { IEvent };

export default function useEvent() {
  const [event, setEvent] = useAtom(eventAtom);

  const toggleEvent = (eventKey: keyof IEvent) => {
    setEvent(prev => ({
      ...prev,
      [eventKey]: !prev[eventKey]
    }));
  };

  return {
    event,
    toggleEvent,
  };
}
