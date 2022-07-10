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
import { authenticate } from '@loopback/authentication';

export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) {}

  @authenticate('jwt')

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


  @get('/todos/{id}')
  @response(200, {
    description: 'Todo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Task, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Task, {exclude: 'where'}) filter?: FilterExcludingWhere<Task>
  ): Promise<Task> {
    return this.todoRepository.findById(id, filter);
  }

  @post('/todos')
  @response(200,{
    description: 'Post Task',
    content: {
      'application/json' :{
        schema: getModelSchemaRef(Task)}}
      })

async create(
  @requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(Task, {
          title: 'NewTask',
          exclude: ['id']
        })
      }
    }
  })
  todo: Omit<Task, 'id'>,
): Promise<Task>{
  return this.todoRepository.create(todo)
}


@patch('/todos/{id}')
  @response(204, {
    description: 'Todo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {partial: true}),
        },
      },
    })
    todo: Task,
  ): Promise<void> {
    await this.todoRepository.updateById(id, todo);
  }

  @del('/todos/{id}')
  @response(204, {
    description: 'Todo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoRepository.deleteById(id);
  }

  

}

