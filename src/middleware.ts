import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// =====================================================
// Maintenance Mode Middleware
// Easily disable site by setting SITE_ACTIVE=false
// =====================================================

export function middleware(request: NextRequest) {
  // Check if site is active (default to true if not set)
  const siteActive = process.env.SITE_ACTIVE !== 'false';

  if (!siteActive) {
    // Return maintenance page
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Site Under Maintenance</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background: linear-gradient(135deg, #1a1814 0%, #2d2820 100%);
              color: #faf8f5;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2rem;
            }
            .container {
              max-width: 600px;
              text-align: center;
            }
            h1 {
              font-size: 3rem;
              font-weight: 700;
              margin-bottom: 1rem;
              color: #d4af37;
            }
            p {
              font-size: 1.25rem;
              line-height: 1.6;
              margin-bottom: 2rem;
              opacity: 0.9;
            }
            .logo {
              font-size: 2rem;
              font-weight: 700;
              letter-spacing: 0.1em;
              margin-bottom: 2rem;
              color: #d4af37;
            }
            .contact {
              margin-top: 3rem;
              padding-top: 2rem;
              border-top: 1px solid rgba(212, 175, 55, 0.2);
            }
            .contact p {
              font-size: 1rem;
              margin-bottom: 0.5rem;
            }
            a {
              color: #d4af37;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">ZG GROUP</div>
            <h1>Under Maintenance</h1>
            <p>
              We're currently performing scheduled maintenance to improve your experience.
              Our site will be back online shortly.
            </p>
            <p>
              Thank you for your patience.
            </p>
            <div class="contact">
              <p>For urgent inquiries, please contact us at:</p>
              <p><a href="mailto:info@zgbusinessgroup.com">info@zgbusinessgroup.com</a></p>
            </div>
          </div>
        </body>
      </html>
      `,
      {
        status: 503,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Retry-After': '3600', // Suggest retry after 1 hour
        },
      }
    );
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
