# GitHub Actions Setup Guide

## Overview
This project uses GitHub Actions to automatically deploy the Garden Weather Oracle application to IBM Cloud Code Engine whenever code is pushed to the `main` branch.

## Current Workflow
The workflow file is located at `.github/workflows/deploy.yml` and performs the following steps:
1. Checks out the code
2. Installs IBM Cloud CLI and required plugins
3. Authenticates with IBM Cloud
4. Builds and pushes a Docker image to IBM Container Registry
5. Deploys the application to Code Engine
6. Provides deployment summary

## Required GitHub Secrets

You need to configure the following secrets in your GitHub repository:

### 1. IBM_CLOUD_API_KEY
- **Description**: Your IBM Cloud API key for authentication
- **How to get it**:
  1. Log in to IBM Cloud: https://cloud.ibm.com
  2. Go to Manage → Access (IAM) → API keys
  3. Click "Create an IBM Cloud API key"
  4. Give it a name (e.g., "GitHub Actions Deploy")
  5. Copy the API key (you won't be able to see it again!)

### 2. IBM_REGISTRY_NAMESPACE
- **Description**: Your IBM Container Registry namespace
- **How to get it**:
  ```bash
  ibmcloud cr namespace-list
  ```
- If you don't have one, create it:
  ```bash
  ibmcloud cr namespace-add <your-namespace-name>
  ```

### 3. NOTION_TOKEN
- **Description**: Your Notion integration token
- **How to get it**:
  1. Go to https://www.notion.so/my-integrations
  2. Click "New integration"
  3. Give it a name and select the workspace
  4. Copy the "Internal Integration Token"
  5. Share your database with this integration

### 4. NOTION_DATABASE_ID
- **Description**: The ID of your Notion database
- **How to get it**:
  - From the database URL: `https://notion.so/workspace/<database-id>?v=...`
  - The database ID is the 32-character string after the workspace name

## Adding Secrets to GitHub

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with its name and value
5. Click **Add secret**

Required secrets:
- `IBM_CLOUD_API_KEY`
- `IBM_REGISTRY_NAMESPACE`
- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

## Environment Configuration

The workflow uses these environment variables (configured in the workflow file):

```yaml
IBM_CLOUD_REGION: au-syd
IBM_CLOUD_RESOURCE_GROUP: Default
CODE_ENGINE_PROJECT: garden-oracle-project
CODE_ENGINE_APP: garden-oracle
```

### Customizing for Your Setup

If you need to change these values, edit `.github/workflows/deploy.yml`:

1. **Region**: Change `IBM_CLOUD_REGION` to your preferred region:
   - `us-south`, `us-east`, `eu-gb`, `eu-de`, `jp-tok`, `au-syd`, etc.

2. **Resource Group**: Change `IBM_CLOUD_RESOURCE_GROUP` if using a different group

3. **Project Name**: Change `CODE_ENGINE_PROJECT` to match your Code Engine project name

4. **App Name**: Change `CODE_ENGINE_APP` to match your application name

## Prerequisites

Before the workflow can run successfully, ensure you have:

### 1. IBM Cloud Code Engine Project
```bash
# Create a project if you don't have one
ibmcloud ce project create --name garden-oracle-project
```

### 2. IBM Container Registry Namespace
```bash
# Create a namespace if you don't have one
ibmcloud cr namespace-add <your-namespace>
```

### 3. Code Engine Application
The workflow uses `ibmcloud ce app update`, which means the app should already exist. Create it first:

```bash
# Select your project
ibmcloud ce project select --name garden-oracle-project

# Create the application (initial deployment)
ibmcloud ce app create \
  --name garden-oracle \
  --image au-syd.icr.io/<your-namespace>/garden-oracle:latest \
  --cpu 0.25 \
  --memory 0.5G \
  --min-scale 0 \
  --max-scale 2 \
  --port 8080
```

## Triggering the Workflow

The workflow runs automatically when:
- Code is pushed to the `main` branch
- You manually trigger it from the GitHub Actions tab

### Manual Trigger
1. Go to your repository on GitHub
2. Click on **Actions** tab
3. Select **Deploy to IBM Cloud Code Engine** workflow
4. Click **Run workflow** button
5. Select the branch and click **Run workflow**

## Monitoring Deployments

### View Workflow Runs
1. Go to the **Actions** tab in your GitHub repository
2. Click on a workflow run to see details
3. Expand each step to view logs

### Check Deployment Status
After a successful deployment, the workflow will output:
- ✅ Deployment status
- 🏷️ Docker image tag
- 📝 Commit SHA
- 👤 Who deployed it
- ⏰ Deployment time

### Get Application URL
```bash
ibmcloud ce project select --name garden-oracle-project
ibmcloud ce app get --name garden-oracle
```

## Troubleshooting

### Common Issues

#### 1. Authentication Failed
- **Error**: `FAILED: Authentication failed`
- **Solution**: Verify your `IBM_CLOUD_API_KEY` secret is correct

#### 2. Namespace Not Found
- **Error**: `The specified namespace does not exist`
- **Solution**: Create the namespace or update `IBM_REGISTRY_NAMESPACE` secret

#### 3. Project Not Found
- **Error**: `Project 'garden-oracle-project' not found`
- **Solution**: Create the project or update `CODE_ENGINE_PROJECT` in the workflow

#### 4. Application Not Found
- **Error**: `Application 'garden-oracle' not found`
- **Solution**: Create the application first (see Prerequisites section)

#### 5. Docker Build Failed
- **Error**: Build errors during Docker image creation
- **Solution**: Test the Docker build locally:
  ```bash
  docker build -t garden-oracle:test .
  docker run -p 8080:8080 garden-oracle:test
  ```

### Viewing Logs

#### GitHub Actions Logs
- Go to Actions tab → Select workflow run → Click on job → Expand steps

#### Code Engine Logs
```bash
ibmcloud ce project select --name garden-oracle-project
ibmcloud ce app logs --name garden-oracle
```

## Testing Locally

Before pushing to GitHub, test your Docker setup locally:

```bash
# Build the image
docker build -t garden-oracle:local .

# Run the container
docker run -p 8080:8080 \
  -e NOTION_TOKEN=your_token \
  -e NOTION_DATABASE_ID=your_db_id \
  garden-oracle:local

# Test the application
curl http://localhost:8080
```

## Workflow Features

### Automatic Tagging
- Each deployment is tagged with the Git commit SHA
- Latest tag is also updated for easy reference

### Environment Variables
- Notion credentials are securely passed from GitHub Secrets
- No sensitive data is stored in the repository

### Resource Configuration
- CPU: 0.25 vCPU
- Memory: 0.5 GB
- Min scale: 0 (scales to zero when not in use)
- Max scale: 2 instances
- Port: 8080

### Deployment Summary
After each deployment, a summary is added to the workflow run showing:
- Deployment status
- Docker image details
- Commit information
- Deployer and timestamp

## Next Steps

1. ✅ Add all required secrets to GitHub
2. ✅ Verify IBM Cloud resources exist (project, namespace)
3. ✅ Create initial Code Engine application
4. ✅ Push code to `main` branch to trigger deployment
5. ✅ Monitor the workflow run in GitHub Actions
6. ✅ Access your deployed application

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [IBM Cloud Code Engine Documentation](https://cloud.ibm.com/docs/codeengine)
- [IBM Container Registry Documentation](https://cloud.ibm.com/docs/Registry)
- [Docker Documentation](https://docs.docker.com/)

---

**Made with Bob** 🌱
