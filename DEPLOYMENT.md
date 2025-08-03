# Deployment Guide

## Quick Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Product Idea Assistant"
   git branch -M main
   git remote add origin https://github.com/yourusername/product-idea-assistant.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `GOOGLE_API_KEY=your_api_key`
   - Click "Deploy"

3. **Custom Domain (Optional)**
   - In Vercel dashboard, go to your project
   - Click "Domains" tab
   - Add your custom domain (e.g., `ideas.prosora.in`)

## Alternative Deployment Options

### Netlify
1. Build the static export:
   ```bash
   npm run build
   npm run export
   ```
2. Upload the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

### Railway
1. Connect your GitHub repo to Railway
2. Add `GOOGLE_API_KEY` environment variable
3. Deploy automatically on push

### DigitalOcean App Platform
1. Create new app from GitHub
2. Set build command: `npm run build`
3. Set run command: `npm start`
4. Add environment variables

## Environment Variables

Required for all deployments:
- `GOOGLE_API_KEY`: Your Google Gemini API key

## Post-Deployment Checklist

- [ ] Test the chat functionality
- [ ] Verify API key is working
- [ ] Check mobile responsiveness
- [ ] Update README with live demo URL
- [ ] Add link to prosora.in
- [ ] Set up analytics (optional)

## Monitoring & Maintenance

- Monitor API usage in Google AI Studio
- Check Vercel/hosting platform logs for errors
- Update dependencies regularly
- Monitor user feedback and iterate