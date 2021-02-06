import { ComponentEvent } from './component-event';
import { Subject } from 'rxjs';
export class ComponentEventHandler<eventT, dataT> {
  private eventEmmiter: Subject<ComponentEvent<eventT, dataT>> = new Subject();
  onEvent = this.eventEmmiter.asObservable();

  constructor() { }

  dispatchAction(action: ComponentEvent<eventT, dataT>) {
    this.eventEmmiter.next(action);
  }
}
