"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTokenFromHeader = void 0;
const extractTokenFromHeader = (request) => {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
};
exports.extractTokenFromHeader = extractTokenFromHeader;
//# sourceMappingURL=extract-token-from-header.js.map