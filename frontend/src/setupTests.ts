import 'whatwg-fetch';
import '@testing-library/jest-dom';
import dotenv from 'dotenv';
import { setupServer } from 'msw/node';

import { handlers } from './mocks/handlers';

dotenv.config();

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
