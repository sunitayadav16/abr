import { Observable } from "rxjs";

export declare interface UnsavedChangesComponent {
    canDeactivate: () => boolean | Observable<boolean>;
}