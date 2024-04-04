import crypto from 'crypto';

export function createRandomPassword(): string {
    return crypto.randomBytes(20).toString('hex');
}

