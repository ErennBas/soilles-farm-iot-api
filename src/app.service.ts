import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return "<style>body { display: flex; justify-content: center; align-items: center; font-size: 40px; font-family: monospace; }</style>I'm still running";
    }
}
