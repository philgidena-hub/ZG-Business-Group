import { NextRequest, NextResponse } from 'next/server';

// =====================================================
// Directus API Proxy
// Proxies requests to HTTP Directus server from HTTPS frontend
// This allows the Vercel deployment to work with CMS data
// before Cloudflare HTTPS is set up
// =====================================================

const DIRECTUS_URL = 'http://52.29.229.59:8055';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const url = `${DIRECTUS_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;

    console.log('Proxying GET request to:', url);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error('Directus responded with status:', response.status);
      throw new Error(`Directus API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Directus proxy error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch from Directus',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const body = await request.json();
    const url = `${DIRECTUS_URL}/${path}`;

    console.log('Proxying POST request to:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error('Directus responded with status:', response.status);
      throw new Error(`Directus API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error('Directus proxy error:', error);
    return NextResponse.json(
      {
        error: 'Failed to post to Directus',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
