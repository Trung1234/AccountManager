import { Observable } from 'rxjs';


export class PageResult<T>
{
    count: number;
    pageIndex: number;
    pageSize: number;
    items: T[];
}
