import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';

import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';

import {Task} from '../models/todo1.model';
import {TodoRepository} from '../repositories/todo1.repository';

export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) {}

  @get('/todos/count')
  @response(200, {
    description: 'Todo Model Count',
    content: {
      'application/json': {schema: CountSchema},
    },
  })
  async count(@param.where(Task) where?: Where<Task>): Promise<Count> {
    return this.todoRepository.count(where);
  }

  @get('/todos')
  @response(200, {
    description: 'All Tasks',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Task, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Task) filter: Filter<Task>): Promise<Task[]> {
    return this.todoRepository.find(filter);
  }
}
