import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { rm, stat, watch, writeFile } from 'fs/promises';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private static pathToLogs = 'logs/logs.txt';
  private static pathToLogsErrors = 'logs/logsErrors.txt';

  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context);
    this.writeLog(this.getFormattedMessage(message, 'error', context), true);
  }
  log(message: any, context?: string) {
    super.log(message, context);
    this.writeLog(this.getFormattedMessage(message, 'log', context), false);
  }
  warn(message: any, context?: string) {
    super.warn(message, context);
    this.writeLog(this.getFormattedMessage(message, 'warn', context), false);
  }
  debug(message: any, context?: string) {
    super.debug(message, context);
    this.writeLog(this.getFormattedMessage(message, 'debug', context), false);
  }
  verbose(message: any, context?: string) {
    super.verbose(message, context);
    this.writeLog(this.getFormattedMessage(message, 'verbose', context), false);
  }

  private getFormattedMessage(
    message: string,
    logLevel: LogLevel,
    context?: string,
  ) {
    return `${new Date().toISOString()}\t${logLevel}\t[${
      context || ''
    }] ${message} \n`;
  }

  private writeLog(message: string, isError: boolean) {
    writeFile(CustomLogger.pathToLogs, message, { encoding: 'utf-8' });
    if (isError) {
      writeFile(CustomLogger.pathToLogsErrors, message, { encoding: 'utf-8' });
    }
  }

  async clearLogs(logLimit: number) {
    const currentSize = await stat(CustomLogger.pathToLogs).then(
      (stat) => stat.size,
    );
    const watcher = watch(CustomLogger.pathToLogs);
    for await (const event of watcher) {
      if (event.eventType === 'change' && currentSize > logLimit) {
        await rm(CustomLogger.pathToLogs);
      }
    }
  }
}
