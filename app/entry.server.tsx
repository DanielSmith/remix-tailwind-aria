import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';

export default function handleRequest(request: Request, responseStatusCode: number, responseHeaders: Headers, remixContext: EntryContext) {
  const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

  // const sessionSecret = process.env.MESSAGE;
  // if (!sessionSecret) {
  //   throw new Error('No session secret');
  // }
  // console.log(sessionSecret);

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
