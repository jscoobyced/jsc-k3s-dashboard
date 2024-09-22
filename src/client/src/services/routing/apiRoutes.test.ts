import { apiDomain, pageRoutes } from './apiRoutes';

describe('apiRoutes', () => {
  it('should return the correct routes', () => {
    expect(pageRoutes).toBe('http://localhost:3000/api/pages');
  });

  it('should return the correct production routes', () => {
    const originalLocation = window.location;
    const mockedHostname = 'example.com';
    const mockedUrl = new URL(`https://${mockedHostname}`);
    //@ts-expect-error: Allowed for this specific test only
    delete window.location;
    //@ts-expect-error: Allowed for this specific test only
    window.location = mockedUrl;
    const actualApiDomain = apiDomain();
    expect(actualApiDomain).toBe(`https://api.${mockedHostname}/`);
    //@ts-expect-error: Allowed for this specific test only
    delete window.location;
    window.location = originalLocation;
  });
});
