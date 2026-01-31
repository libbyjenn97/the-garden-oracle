# Deploying Garden Oracle to IBM Cloud Code Engine

This guide will help you deploy your Garden Oracle app to IBM Cloud Code Engine.

## Prerequisites

1. IBM Cloud account with Code Engine access
2. IBM Cloud CLI installed
3. Docker installed (optional, Code Engine can build from source)
4. Your Notion API credentials

## Deployment Steps

### Option 1: Deploy from Source (Recommended)

1. **Login to IBM Cloud**
   ```bash
   ibmcloud login
   ```

2. **Target your Code Engine project** (or create one)
   ```bash
   ibmcloud ce project select --name your-project-name
   ```
   
   Or create a new project:
   ```bash
   ibmcloud ce project create --name garden-oracle
   ibmcloud ce project select --name garden-oracle
   ```

3. **Create the application from GitHub**
   ```bash
   ibmcloud ce application create \
     --name garden-oracle \
     --build-source https://github.com/libbyjenn97/the-garden-oracle \
     --build-context-dir . \
     --port 8080 \
     --min-scale 0 \
     --max-scale 1 \
     --cpu 0.25 \
     --memory 0.5G
   ```

4. **Set environment variables (IMPORTANT!)**
   ```bash
   ibmcloud ce application update \
     --name garden-oracle \
     --env NOTION_TOKEN=your_notion_token_here \
     --env NOTION_DATABASE_ID=your_database_id_here
   ```

5. **Get your application URL**
   ```bash
   ibmcloud ce application get --name garden-oracle
   ```
   
   Look for the URL in the output (e.g., `https://garden-oracle.xxx.us-south.codeengine.appdomain.cloud`)

### Option 2: Deploy with Docker

1. **Build Docker image locally**
   ```bash
   docker build -t garden-oracle .
   ```

2. **Tag for IBM Cloud Container Registry**
   ```bash
   docker tag garden-oracle us.icr.io/your-namespace/garden-oracle:latest
   ```

3. **Push to registry**
   ```bash
   docker push us.icr.io/your-namespace/garden-oracle:latest
   ```

4. **Deploy to Code Engine**
   ```bash
   ibmcloud ce application create \
     --name garden-oracle \
     --image us.icr.io/your-namespace/garden-oracle:latest \
     --port 8080 \
     --env NOTION_TOKEN=your_notion_token_here \
     --env NOTION_DATABASE_ID=your_database_id_here
   ```

## Configuration

### Environment Variables

Set these in Code Engine:

- `NOTION_TOKEN`: Your Notion integration token
- `NOTION_DATABASE_ID`: Your Notion database ID
- `PORT`: Automatically set by Code Engine (8080)

### Scaling

The app is configured with:
- **Min scale**: 0 (scales to zero when not in use - saves costs!)
- **Max scale**: 1 (sufficient for personal use)
- **CPU**: 0.25 vCPU
- **Memory**: 0.5 GB

Adjust these based on your needs:
```bash
ibmcloud ce application update \
  --name garden-oracle \
  --min-scale 1 \
  --max-scale 3 \
  --cpu 0.5 \
  --memory 1G
```

## Updating Your Deployment

When you push changes to GitHub:

```bash
# Rebuild and redeploy
ibmcloud ce application update \
  --name garden-oracle \
  --build-source https://github.com/libbyjenn97/the-garden-oracle
```

## Monitoring

View logs:
```bash
ibmcloud ce application logs --name garden-oracle
```

Check application status:
```bash
ibmcloud ce application get --name garden-oracle
```

## Troubleshooting

### App won't start
- Check logs: `ibmcloud ce application logs --name garden-oracle`
- Verify environment variables are set correctly
- Ensure Notion credentials are valid

### Can't access the app
- Verify the application is running: `ibmcloud ce application get --name garden-oracle`
- Check if it scaled to zero (first request will take longer)
- Verify port 8080 is configured

### Notion API not working
- Ensure environment variables are set in Code Engine (not just locally)
- Regenerate Notion token if it was exposed
- Verify database ID is correct

## Cost Optimization

Code Engine pricing is based on:
- vCPU-seconds
- GB-seconds of memory
- HTTP requests

With min-scale 0, the app will scale to zero when not in use, minimizing costs. Perfect for personal projects!

## Security Notes

1. **Never commit .env file** - It's in .gitignore
2. **Set secrets in Code Engine** - Use environment variables
3. **Regenerate Notion token** - If it was ever exposed
4. **Use HTTPS** - Code Engine provides this automatically

## Custom Domain (Optional)

To use your own domain:

1. Add a custom domain in Code Engine:
   ```bash
   ibmcloud ce application update \
     --name garden-oracle \
     --domain your-domain.com
   ```

2. Update your DNS records as instructed by Code Engine

## Support

- IBM Cloud Code Engine docs: https://cloud.ibm.com/docs/codeengine
- Notion API docs: https://developers.notion.com/
- GitHub repo: https://github.com/libbyjenn97/the-garden-oracle