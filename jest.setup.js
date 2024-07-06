import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { server } from './mocks/server';

jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

beforeAll(() => {
    server.listen();
})

afterEach(() => {
    server.resetHandlers();
})

afterAll(() => {
    server.close();
})