import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModelComment} from '../../model/model.comment';
import {config} from '../../app-config/application.config';

@Injectable({
  providedIn: 'root'
})
export class CommentAdminService {

  constructor(private http: HttpClient) { }

  getSomeNotiAdminAPI(): Observable<ModelComment> {
    // @ts-ignore
    return this.http.get(config.get_some_notification_admin_API);
  }
}
