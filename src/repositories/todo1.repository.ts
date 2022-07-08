import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db1.datasource';
import {Task} from '../models/todo1.model';

export class TodoRepository extends DefaultCrudRepository<
  Task,
  typeof Task.prototype.id
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Task, dataSource);
  }
}
