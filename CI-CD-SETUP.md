# CI/CD Pipeline Setup for Garden Oracle

This guide explains how to set up automated deployment to IBM Cloud Code Engine using IBM Cloud Continuous Delivery with Tekton pipelines.

## Overview

The CI/CD pipeline automatically:
1. **Triggers** on git push to the `main` branch
2. **Clones** the repository
3. **Builds** a Docker image
4. **Pushes** the image to IBM Container Registry
5. **Deploys** to Code Engine with zero downtime

## Architecture

```
GitHub Push → Webhook → Event Listener → Tekton Pipeline → Code Engine
```

## Prerequisites

1. **IBM Cloud Account** with access to:
   - IBM Cloud Continuous Delivery
   - IBM Container Registry
   - IBM Cloud Code Engine
   
2. **GitHub Repository** (already set up at https://github.com/libbyjenn97/the-garden-oracle)

3. **IBM Cloud CLI** with plugins:
   ```bash
   ibmcloud plugin install container-registry
   ibmcloud plugin install code-engine
   ibmcloud plugin install dev
   ```

## Step 1: Create Continuous Delivery Toolchain

### Option A: Using IBM Cloud Console (Recommended)

1. **Navigate to Continuous Delivery**:
   - Go to https://cloud.ibm.com/devops/toolchains
   - Click "Create toolchain"
   - Select "Build your own toolchain"

2. **Configure Toolchain**:
   - Name: `garden-oracle-toolchain`
   - Region: `Sydney (au-syd)`
   - Resource group: Select your resource group
   - Click "Create"

3. **Add GitHub Integration**:
   - Click "Add tool" → "GitHub"
   - Authorize IBM Cloud to access GitHub
   - Repository type: "Existing"
   - Repository URL: `https://github.com/libbyjenn97/the-garden-oracle`
   - Click "Create Integration"

4. **Add Delivery Pipeline**:
   - Click "Add tool" → "Delivery Pipeline"
   - Pipeline name: `garden-oracle-pipeline`
   - Pipeline type: "Tekton"
   - Click "Create Integration"

### Option B: Using IBM Cloud CLI

```bash
# Login to IBM Cloud
ibmcloud login --sso

# Target your resource group and region
ibmcloud target -r au-syd -g Default

# Create toolchain
ibmcloud dev toolchain-create \
  --name garden-oracle-toolchain \
  --template https://github.com/open-toolchain/simple-tekton-toolchain
```

## Step 2: Configure Tekton Pipeline

1. **Access Pipeline**:
   - From your toolchain, click on the "Delivery Pipeline" tile
   - Click "Configure Pipeline"

2. **Add Pipeline Definition**:
   - Click "Definitions" tab
   - Repository: Select your GitHub repo
   - Branch: `main`
   - Path: `.tekton`
   - Click "Save"

3. **Add Environment Properties**:
   - Click "Environment properties" tab
   - Add the following properties:

   | Property Name | Type | Value |
   |--------------|------|-------|
   | `registry-namespace` | Text | Your ICR namespace (e.g., `garden-oracle-ns`) |
   | `code-engine-project` | Text | Your Code Engine project name |
   | `NOTION_TOKEN` | Secure | Your Notion API token |
   | `NOTION_DATABASE_ID` | Secure | Your Notion database ID |

4. **Add Triggers**:
   - Click "Triggers" tab
   - Click "Add trigger" → "Git Repository"
   - Event Listener: `garden-oracle-event-listener`
   - Repository: Select your GitHub repo
   - Branch: `main`
   - Events: Check "Push"
   - Click "Save"

## Step 3: Set Up GitHub Webhook

1. **Get Webhook URL**:
   - In your pipeline, go to "Triggers" tab
   - Copy the webhook URL (looks like: `https://devops-api.au-syd.devops.cloud.ibm.com/v1/tekton-webhook/...`)

2. **Configure GitHub Webhook**:
   - Go to your GitHub repository settings
   - Click "Webhooks" → "Add webhook"
   - Payload URL: Paste the webhook URL from above
   - Content type: `application/json`
   - Secret: Generate a random secret and save it
   - Events: Select "Just the push event"
   - Active: Check
   - Click "Add webhook"

3. **Store Webhook Secret in IBM Cloud**:
   ```bash
   # Create secret in your toolchain
   ibmcloud dev toolchain-secret-create \
     --toolchain-id YOUR_TOOLCHAIN_ID \
     --name github-webhook-secret \
     --value YOUR_WEBHOOK_SECRET
   ```

## Step 4: Create Code Engine Secret

Your application needs Notion credentials. Create a secret in Code Engine:

```bash
# Login and target Code Engine project
ibmcloud login --sso
ibmcloud target -r au-syd
ibmcloud ce project select --name YOUR_PROJECT_NAME

# Create secret with Notion credentials
ibmcloud ce secret create \
  --name garden-oracle-secrets \
  --from-literal NOTION_TOKEN=YOUR_NOTION_TOKEN \
  --from-literal NOTION_DATABASE_ID=YOUR_NOTION_DATABASE_ID
```

## Step 5: Test the Pipeline

1. **Manual Trigger** (first time):
   - Go to your pipeline in IBM Cloud
   - Click "Run Pipeline"
   - Select the trigger
   - Click "Run"

2. **Automatic Trigger** (subsequent deployments):
   - Make a change to your code
   - Commit and push to `main` branch:
     ```bash
     git add .
     git commit -m "Test CI/CD pipeline"
     git push origin main
     ```
   - Pipeline will automatically trigger

3. **Monitor Pipeline**:
   - Watch the pipeline run in IBM Cloud console
   - Check logs for each task:
     - `git-clone`: Repository cloning
     - `build-image`: Docker build and push
     - `deploy-to-code-engine`: Deployment

## Pipeline Tasks Explained

### Task 1: Git Clone
- Clones your repository
- Checks out the specific commit that triggered the pipeline

### Task 2: Build Image
- Builds Docker image using your Dockerfile
- Tags image with commit SHA for traceability
- Pushes to IBM Container Registry

### Task 3: Deploy to Code Engine
- Updates Code Engine application with new image
- Configures:
  - CPU: 0.25 vCPU
  - Memory: 0.5 GB
  - Min scale: 0 (scales to zero when idle)
  - Max scale: 2 instances
  - Port: 8080
- Injects secrets (Notion credentials)
- Performs rolling update (zero downtime)

## Monitoring and Troubleshooting

### View Pipeline Runs
```bash
# List recent pipeline runs
ibmcloud dev pipeline-run list --pipeline-id YOUR_PIPELINE_ID

# Get details of a specific run
ibmcloud dev pipeline-run get --id RUN_ID
```

### View Code Engine Logs
```bash
# View application logs
ibmcloud ce app logs --name garden-oracle --follow

# View recent revisions
ibmcloud ce revision list --application garden-oracle
```

### Common Issues

**Pipeline fails at build-image:**
- Check Dockerfile syntax
- Verify registry namespace exists
- Ensure API key has registry permissions

**Pipeline fails at deploy:**
- Verify Code Engine project exists
- Check secret `garden-oracle-secrets` exists
- Ensure service account has deployment permissions

**Application doesn't start:**
- Check environment variables are set
- Verify Notion credentials are correct
- Review application logs

## Advanced Configuration

### Branch-Specific Deployments

To deploy different branches to different environments:

1. **Create separate Code Engine projects**:
   - `garden-oracle-dev` (for development branch)
   - `garden-oracle-staging` (for staging branch)
   - `garden-oracle-prod` (for main branch)

2. **Update `.tekton/event-listener.yaml`**:
   ```yaml
   - cel:
       filter: >-
         (body.ref == 'refs/heads/main' || 
          body.ref == 'refs/heads/staging' || 
          body.ref == 'refs/heads/development')
   ```

3. **Add conditional logic in pipeline** to deploy to different projects based on branch.

### Automated Testing

Add a test task before deployment:

```yaml
- name: run-tests
  taskRef:
    name: npm-test
  runAfter:
    - git-clone
  params:
    - name: path-to-context
      value: .
  workspaces:
    - name: source
      workspace: pipeline-workspace
```

### Notifications

Add Slack notifications:

1. Add Slack integration to toolchain
2. Add notification task to pipeline:
   ```yaml
   - name: notify-slack
     taskRef:
       name: send-to-webhook-slack
     runAfter:
       - deploy-to-code-engine
   ```

## Cost Optimization

- **Pipeline runs**: Free tier includes 500 minutes/month
- **Container Registry**: Free tier includes 512 MB storage
- **Code Engine**: Pay only when app is running (scales to zero)

Estimated monthly cost for low-traffic app: **$0-5 USD**

## Security Best Practices

1. **Never commit secrets** to git
2. **Use IBM Cloud Secrets Manager** for production
3. **Rotate API keys** regularly
4. **Enable branch protection** on main branch
5. **Require pull request reviews** before merging
6. **Use signed commits** for audit trail

## Rollback Strategy

If a deployment fails:

```bash
# List revisions
ibmcloud ce revision list --application garden-oracle

# Rollback to previous revision
ibmcloud ce app update --name garden-oracle \
  --revision garden-oracle-00002-abc
```

## Next Steps

1. ✅ Set up staging environment
2. ✅ Add automated tests
3. ✅ Configure monitoring and alerts
4. ✅ Set up database backups
5. ✅ Implement blue-green deployments

## Resources

- [IBM Cloud Continuous Delivery Docs](https://cloud.ibm.com/docs/ContinuousDelivery)
- [Tekton Pipelines Documentation](https://tekton.dev/docs/)
- [Code Engine Documentation](https://cloud.ibm.com/docs/codeengine)
- [Container Registry Documentation](https://cloud.ibm.com/docs/Registry)

## Support

For issues with:
- **Pipeline**: Check IBM Cloud Continuous Delivery logs
- **Deployment**: Check Code Engine application logs
- **Application**: Check browser console and server logs