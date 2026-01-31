# GitHub Secrets Setup - Quick Guide

## Step 1: Navigate to GitHub Repository Settings

1. Go to your GitHub repository: `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME`
2. Click on **Settings** tab (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. You'll see a page titled "Actions secrets and variables"

## Step 2: Gather Your Secret Values

Before adding secrets, you need to collect these 4 values:

### Secret 1: IBM_CLOUD_API_KEY
**Where to get it:**
1. Go to https://cloud.ibm.com
2. Log in to your IBM Cloud account
3. Click on **Manage** (top menu) → **Access (IAM)**
4. Click **API keys** in the left sidebar
5. Click **Create** button (blue button, top right)
6. Enter a name: `GitHub-Actions-Deploy`
7. Add description: `API key for GitHub Actions deployment`
8. Click **Create**
9. **IMPORTANT**: Copy the API key immediately (you won't see it again!)
10. Store it temporarily in a secure note

### Secret 2: IBM_REGISTRY_NAMESPACE
**Where to get it:**
1. Go to https://cloud.ibm.com/registry/namespaces
2. Select your region (e.g., Sydney)
3. You'll see your namespace listed (e.g., `my-namespace`)
4. Copy the namespace name

**If you don't have one:**
1. Click **Create** button
2. Enter a unique namespace name (e.g., `garden-oracle-ns`)
3. Select region: **Sydney** (to match your workflow)
4. Click **Create**

### Secret 3: NOTION_TOKEN
**Where to get it:**
1. Go to https://www.notion.so/my-integrations
2. Click **+ New integration** button
3. Fill in the form:
   - **Name**: `Garden Oracle Integration`
   - **Associated workspace**: Select your workspace
   - **Type**: Internal integration
4. Click **Submit**
5. Copy the **Internal Integration Token** (starts with `secret_`)
6. Store it temporarily

**IMPORTANT - Share database with integration:**
1. Open your Notion database
2. Click the **•••** menu (top right)
3. Click **Add connections**
4. Search for and select `Garden Oracle Integration`
5. Click **Confirm**

### Secret 4: NOTION_DATABASE_ID
**Where to get it:**
1. Open your Notion database in a browser
2. Look at the URL: `https://www.notion.so/workspace/DATABASE_ID?v=...`
3. The DATABASE_ID is the 32-character string between the workspace name and `?v=`
4. Example: `https://www.notion.so/myworkspace/a1b2c3d4e5f6...` 
   - Database ID: `a1b2c3d4e5f6...`
5. Copy this ID

## Step 3: Add Secrets to GitHub

Now add each secret one by one:

### Adding Secret 1: IBM_CLOUD_API_KEY
1. On the "Actions secrets" page, click **New repository secret** (green button)
2. **Name**: `IBM_CLOUD_API_KEY` (exactly as shown, all caps)
3. **Secret**: Paste your IBM Cloud API key
4. Click **Add secret**

### Adding Secret 2: IBM_REGISTRY_NAMESPACE
1. Click **New repository secret** again
2. **Name**: `IBM_REGISTRY_NAMESPACE` (exactly as shown, all caps)
3. **Secret**: Paste your registry namespace (e.g., `garden-oracle-ns`)
4. Click **Add secret**

### Adding Secret 3: NOTION_TOKEN
1. Click **New repository secret** again
2. **Name**: `NOTION_TOKEN` (exactly as shown, all caps)
3. **Secret**: Paste your Notion integration token (starts with `secret_`)
4. Click **Add secret**

### Adding Secret 4: NOTION_DATABASE_ID
1. Click **New repository secret** again
2. **Name**: `NOTION_DATABASE_ID` (exactly as shown, all caps)
3. **Secret**: Paste your Notion database ID (32-character string)
4. Click **Add secret**

## Step 4: Verify All Secrets Are Added

You should now see 4 secrets listed:
- ✅ IBM_CLOUD_API_KEY
- ✅ IBM_REGISTRY_NAMESPACE
- ✅ NOTION_TOKEN
- ✅ NOTION_DATABASE_ID

**Note**: You can't view the secret values after adding them (for security), but you can update or delete them.

## Step 5: Test the Workflow

### Option A: Push to Main Branch
```bash
git add .
git commit -m "Test GitHub Actions deployment"
git push origin main
```

### Option B: Manual Trigger
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Click **Deploy to IBM Cloud Code Engine** workflow (left sidebar)
4. Click **Run workflow** button (right side)
5. Select branch: `main`
6. Click **Run workflow** (green button)

## Step 6: Monitor the Deployment

1. After triggering, you'll see a new workflow run appear
2. Click on the workflow run to see details
3. Watch each step execute:
   - ✅ Checkout code
   - ✅ Install IBM Cloud CLI
   - ✅ Authenticate with IBM Cloud
   - ✅ Build and push Docker image
   - ✅ Deploy to Code Engine
   - ✅ Get application URL

4. If successful, you'll see:
   - 🚀 Application deployed successfully!
   - 📱 URL: Your application URL
   - ✅ Commit: The commit SHA

## Troubleshooting

### Error: "Authentication failed"
- **Problem**: IBM_CLOUD_API_KEY is incorrect or expired
- **Solution**: Create a new API key and update the secret

### Error: "Namespace does not exist"
- **Problem**: IBM_REGISTRY_NAMESPACE doesn't exist or is misspelled
- **Solution**: Verify namespace exists at https://cloud.ibm.com/registry/namespaces

### Error: "Notion API error"
- **Problem**: NOTION_TOKEN is invalid or database not shared
- **Solution**: 
  1. Verify token is correct
  2. Make sure you shared the database with the integration

### Error: "Database not found"
- **Problem**: NOTION_DATABASE_ID is incorrect
- **Solution**: Double-check the database ID from the URL

## Quick Checklist

- [ ] Created IBM Cloud API key
- [ ] Found/created IBM Container Registry namespace
- [ ] Created Notion integration and got token
- [ ] Shared Notion database with integration
- [ ] Got Notion database ID from URL
- [ ] Added all 4 secrets to GitHub
- [ ] Triggered workflow (push or manual)
- [ ] Verified deployment succeeded
- [ ] Tested application URL

## Need Help?

If you get stuck:
1. Check the workflow logs in GitHub Actions
2. Verify each secret is spelled correctly (case-sensitive!)
3. Make sure IBM Cloud resources exist (project, namespace, app)
4. Review the full guide in `GITHUB-ACTIONS-SETUP.md`

---

**Made with Bob** 🌱