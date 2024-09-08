import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

const toInt = (str: string | null) => str ? parseInt(str, 10) : 0;

export async function GET(request: NextRequest) {
	const myKv = getRequestContext().env.NEXT_ON_PAGES
	const count = toInt(await myKv.get('count'));
	await myKv.put('count', String(count + 1));
	await new Promise(resolve => setTimeout(resolve, 1000))
	const response = new Response(`Count: ${count + 1}`);
	response.headers.set('Cache-Control', 'max-age=10, stale-while-revalidate=60')
	return response;
}
