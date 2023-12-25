import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    let s = ''
    err.issues.map((issue: ZodIssue) => {
        return s = s + `${issue?.path[issue.path.length - 1]} is ${issue.message}.`
    });
    const errorMessage = s
    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorMessage,
    };
};

export default handleZodError;