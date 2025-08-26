import { useAtom } from 'jotai';
import { eventAtom } from '@/store/atoms';
import { IEvent } from '@/types';

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
