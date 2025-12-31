# Cloudflare Setup Guide for ZG Business Group

This guide will help you set up Cloudflare with a custom domain to enable HTTPS for both the frontend and Directus CMS.

## Problem

The site is deployed on Vercel with HTTPS, but the Directus CMS runs on HTTP (`http://52.29.229.59:8055`). Browsers block "mixed content" - HTTPS pages cannot fetch HTTP resources.

## Solution

Use Cloudflare to:
1. Set up a custom domain for the frontend
2. Create a Cloudflare Tunnel for the Directus CMS to enable HTTPS

---

## Part 1: Frontend Domain Setup

### Step 1: Add Domain to Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click "Add a Site"
3. Enter your domain (e.g., `zggroup.com` or `zgbusinessgroup.com`)
4. Select the Free plan
5. Cloudflare will scan your DNS records
6. Update your domain's nameservers at your registrar to Cloudflare's nameservers

### Step 2: Configure DNS for Frontend

1. In Cloudflare DNS settings, add an A record or CNAME:
   - **Type**: CNAME
   - **Name**: `@` (for root domain) or `www`
   - **Target**: `cname.vercel-dns.com`
   - **Proxy status**: Proxied (orange cloud)

### Step 3: Configure Domain in Vercel

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `zggroup.com`)
4. Vercel will verify the domain automatically

### Step 4: Update Site URL

Once the domain is configured, update `next.config.js`:

```javascript
env: {
  NEXT_PUBLIC_DIRECTUS_URL: 'https://cms.zggroup.com', // Update after Part 2
  NEXT_PUBLIC_SITE_URL: 'https://zggroup.com', // Your custom domain
},
```

---

## Part 2: Directus CMS HTTPS Setup via Cloudflare Tunnel

### Option A: Cloudflare Tunnel (Recommended - Free)

#### Step 1: Install Cloudflared on Your Server

SSH into your Directus server (`52.29.229.59`) and run:

```bash
# For Ubuntu/Debian
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# For other systems, see: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
```

#### Step 2: Authenticate Cloudflared

```bash
cloudflared tunnel login
```

This will open a browser for authentication.

#### Step 3: Create a Tunnel

```bash
cloudflared tunnel create zg-directus
```

Copy the Tunnel ID that's displayed.

#### Step 4: Configure the Tunnel

Create a config file at `~/.cloudflared/config.yml`:

```yaml
tunnel: <TUNNEL_ID>
credentials-file: /home/ubuntu/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: cms.zggroup.com
    service: http://localhost:8055
  - service: http_status:404
```

#### Step 5: Add DNS Record in Cloudflare

1. Go to Cloudflare DNS
2. Add a CNAME record:
   - **Type**: CNAME
   - **Name**: `cms`
   - **Target**: `<TUNNEL_ID>.cfargotunnel.com`
   - **Proxy status**: Proxied (orange cloud)

#### Step 6: Run the Tunnel

```bash
# Test run
cloudflared tunnel run zg-directus

# Install as a service (runs on boot)
sudo cloudflared service install
sudo systemctl start cloudflared
sudo systemctl enable cloudflared
```

#### Step 7: Verify

Visit `https://cms.zggroup.com` - you should see your Directus instance over HTTPS!

---

### Option B: Cloudflare Argo Tunnel (Alternative)

If you prefer a GUI approach:

1. Go to Cloudflare Zero Trust dashboard
2. Navigate to "Access" → "Tunnels"
3. Click "Create a tunnel"
4. Follow the on-screen instructions to:
   - Name your tunnel: "zg-directus"
   - Install the connector on your server
   - Configure the public hostname: `cms.zggroup.com` → `localhost:8055`

---

## Part 3: Update Next.js Configuration

After both parts are complete, update `next.config.js`:

```javascript
env: {
  NEXT_PUBLIC_DIRECTUS_URL: 'https://cms.zggroup.com',
  NEXT_PUBLIC_SITE_URL: 'https://zggroup.com',
},
```

Also update the image configuration for HTTPS:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cms.zggroup.com', // Updated from HTTP
    },
    // ... other patterns
  ],
},
```

---

## Part 4: Deploy Updates

1. Commit and push changes:
```bash
git add .
git commit -m "Update configuration for custom domain with HTTPS"
git push origin main
```

2. Vercel will automatically redeploy

---

## Verification Checklist

- [ ] Custom domain resolves to Vercel (e.g., `zggroup.com`)
- [ ] Directus CMS accessible via HTTPS (e.g., `https://cms.zggroup.com`)
- [ ] No mixed content errors in browser console
- [ ] Industries section loads data from Directus
- [ ] Images load correctly from Directus
- [ ] Site performance is good (Lighthouse > 90)

---

## Troubleshooting

### Mixed Content Errors Persist
- Ensure `NEXT_PUBLIC_DIRECTUS_URL` uses `https://`
- Clear browser cache and hard refresh (Ctrl+Shift+R)
- Check browser console for specific blocked URLs

### Cloudflare Tunnel Not Working
- Check tunnel status: `cloudflared tunnel list`
- View tunnel logs: `sudo journalctl -u cloudflared -f`
- Ensure DNS record points to correct tunnel ID

### Domain Not Resolving
- DNS changes can take up to 48 hours (usually much faster)
- Use `nslookup zggroup.com` to check DNS propagation
- Verify nameservers are set correctly at your registrar

---

## Cost

- ✅ Cloudflare Free plan: $0/month
- ✅ Cloudflare Tunnel: Free
- ✅ Vercel Hobby plan: $0/month
- Total: **$0/month**

---

## Support

- Cloudflare Tunnel Docs: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
- Vercel Custom Domains: https://vercel.com/docs/concepts/projects/domains
- If you need help, contact: info@zggroup.com
