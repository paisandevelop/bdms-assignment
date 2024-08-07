import { NextFunction, Response } from 'express';
import * as _ from 'lodash';
import { BasicResponse } from '../models/net/response/basic_response';
import { logDebug } from '../utils/log/log';
import { CreateTodoListRequest } from '../models/net/request/create_todo_list_request';

export async function ValidateCreateTodoRequestMiddleware(
  request: any,
  response: Response,
  next: NextFunction
): Promise<void> {
  logDebug(`Logging Validate Create Todo Request Middleware:: method: [${request.method}], url: [${request.url}]`);

  // Create PropertyList from Request
  let propertyListTmp = Object.keys(new CreateTodoListRequest());
  let propertyList = Object.keys(new CreateTodoListRequest());

  // Donot expect this property
  const excludedProperty = ['someProperty'];
  propertyListTmp = propertyListTmp.filter(p => !excludedProperty.includes(p));

  // Check request body is missing some property in PropertyList.
  const ecdRequestPropertyList = Object.keys(request.body);
  const isMissingProperty = _.difference(propertyListTmp, ecdRequestPropertyList);

  if (isMissingProperty.length > 0) {
    logDebug(`Logging Validate Create Todo Request Middleware:: missing property:: ${isMissingProperty}`);
    response.status(400).json(new BasicResponse(false, 'Invalid request.'));
    return;
  }

  // delete outmatch property in request body
  const outMatchProperty = _.difference(ecdRequestPropertyList, propertyList);
  let newBodyRequest = { ...request.body };
  outMatchProperty.map((property: string) => delete newBodyRequest[property]);

  // check all property is exist.
  const isAllPropertyIsExist = _.difference(propertyList, Object.keys(newBodyRequest));

  if (isAllPropertyIsExist.length === 0) {
    request.body = newBodyRequest;
    next();
  }
}
