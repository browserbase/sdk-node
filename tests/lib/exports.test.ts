import * as sdk from '@browserbasehq/sdk';
import Browserbase from '@browserbasehq/sdk';

const resources = ['Contexts', 'Downloads', 'Extensions', 'FetchAPI', 'Projects', 'Sessions'] as const;
const errors = [
  'APIConnectionError',
  'APIConnectionTimeoutError',
  'APIError',
  'APIUserAbortError',
  'AuthenticationError',
  'BadRequestError',
  'BrowserbaseError',
  'ConflictError',
  'InternalServerError',
  'NotFoundError',
  'PermissionDeniedError',
  'RateLimitError',
  'UnprocessableEntityError',
] as const;
const utilities = ['fileFromPath', 'toFile'] as const;

test('default export is the Browserbase class', () => {
  expect(typeof Browserbase).toBe('function');
  expect(Browserbase.name).toBe('Browserbase');
});

test('named Browserbase export matches default', () => {
  expect(sdk.Browserbase).toBe(Browserbase);
});

test('resource classes are static props on Browserbase', () => {
  for (const name of resources) expect(typeof Browserbase[name]).toBe('function');
});

// CommonJS callers read these off the default export, ESM callers import them by name.
test('error classes are named exports and static props', () => {
  for (const name of errors) {
    expect(typeof sdk[name]).toBe('function');
    expect(Browserbase[name]).toBe(sdk[name]);
  }
});

test('utility functions are named exports and static props', () => {
  for (const name of utilities) {
    expect(typeof sdk[name]).toBe('function');
    expect(Browserbase[name]).toBe(sdk[name]);
  }
});
