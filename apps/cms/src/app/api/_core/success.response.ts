'use strict';

// import { logger } from '@repo/lib/logger';
import { StatusCodes, ReasonPhrases } from './httpStatusCode';
import { ResponseIF } from '@repo/types/response';

class SuccessResponse implements ResponseIF {
  message: string;
  status: number;
  reason: string;
  metadata: object;

  constructor({ message, status, reason, metadata }: ResponseIF) {
    this.message = message ?? reason;
    this.status = status ?? StatusCodes.OK;
    this.reason = reason ?? ReasonPhrases.OK;
    this.metadata = metadata || {};

    // logger.info(`${status} - ${message}`);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }: ResponseIF) {
    super({
      message,
      status: StatusCodes.OK,
      reason: ReasonPhrases.OK,
      metadata,
    });
  }
}

class CREATED extends SuccessResponse {
  constructor({ message, metadata }: ResponseIF) {
    super({
      message,
      status: StatusCodes.CREATED,
      reason: ReasonPhrases.CREATED,
      metadata,
    });
  }
}

export { SuccessResponse, OK, CREATED };
