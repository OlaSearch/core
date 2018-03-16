### Initialize Ola Search

Download the configurations from https://admin.olasearch.com . The configuration files contain settings for the project, filters, snippets, relevancy boosting etc.

1. Login to https://admin.olasearch.com
2. Navigate to Project -> Settings
3. Download the configuration files.
4. Save the file as olasearch.config.js


### Download Ola Search starter kit

```bash
git clone https://gitlab.com/olasearch/olasearch-project-starter.git
cd olasearch-project-starter
npm install
cd src
# Copy the config file to `src` directory
npm run start
```