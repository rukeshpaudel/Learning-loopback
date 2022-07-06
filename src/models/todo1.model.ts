import { extensionFilter } from "@loopback/core";
import { Entity , model, property} from "@loopback/repository";

@model()
    export class Task extends Entity{
        @property ({
            require:true,
            type: 'number',
            id: true,
            generated: true    
        }) Task_id: number;

        @property(
            {
            type:'string',
            require : true,
        }
        ) task_name: string;

        @property({
            type:'string',
            require : false,
            
        }) task_desc : string;

        @property({
            type:'boolean',
            require : false,
            default: false
            
        }) isCompleted : boolean;


        constructor(data?: Partial<Task>) {
            super(data);

        }
    }