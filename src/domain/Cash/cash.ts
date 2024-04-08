import { InvalidParamError } from "@app/errors/InvalidParamError";
import { MissingParamError } from "@app/errors/MissingParamError";
import { z } from 'zod';


interface CashCreationProps {
    id?: string;
    amount: number;
    userId: string;
    }

interface NewCash {
    body: CashCreationProps;
    statusCode: number;
}

interface IsValidMethodReturn {
    isValid: boolean;
    body: any;
    statusCode: number;
}

export class Cash {
    props: CashCreationProps;

    constructor(props: CashCreationProps) {
        const newCash = this.handle(props);

        if (newCash.statusCode >= 300) {
            throw newCash.body;
        }
        this.props = newCash.body;
    }

    private handle(props: CashCreationProps): NewCash {
        const { isValid, body, statusCode } = this.isValid(props);

        if (!isValid) {
            return {
                body: body,
                statusCode: statusCode,
            };
        }

        return {
            body: props,
            statusCode: 200,
        };
    }

    private isValid(params: CashCreationProps): IsValidMethodReturn {
        const cashSchema = z.object({
            amount: z.number(),
            userId: z.string(),
        });
        const cashValidation = cashSchema.safeParse(params);
        if(!cashValidation.success){
            const errorPath = cashValidation.error.errors[0].path[0].toString();
            const errorMessage = cashValidation.error.errors[0].message;
            const errorBody =
              errorMessage === 'Invalid'
                ? new InvalidParamError(errorPath)
                : new MissingParamError(errorPath);
      
            return {
              isValid: false,
              body: errorBody,
              statusCode: 400,
            };
          }
      
          return {
            isValid: true,
            body: null,
            statusCode: 200,
          };
        }
      }
      