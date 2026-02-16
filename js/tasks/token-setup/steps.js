export const tokenSteps = [
    {
        id: 'github',
        title: 'GitHub Integration',
        icon: '🐙',
        description: 'Connect to your repositories and manage code. Required scopes: <code>repo</code>, <code>admin:ssh_signing_key</code>.',
        inputLabel: 'GitHub Personal Access Token',
        placeholder: 'ghp_xxxxxxxxxxxxxxxxxxxx',
        helpLink: 'https://github.com/settings/tokens/new?scopes=repo,admin:ssh_signing_key&description=IF+Dashboard',
        field: 'token_github',
        required: true
    },
    {
        id: 'pubmed',
        title: 'PubMed (NCBI)',
        icon: '🧬',
        description: 'Access medical research and publications from NCBI databases.',
        inputLabel: 'NCBI API Key',
        placeholder: 'Paste your API key here',
        helpLink: 'https://account.ncbi.nlm.nih.gov/settings/',
        field: 'token_pubmed',
        required: false
    },
    {
        id: 'scopus',
        title: 'Scopus (Elsevier)',
        icon: '🔭',
        description: 'Search the largest abstract and citation database of peer-reviewed literature.',
        inputLabel: 'Elsevier API Key',
        placeholder: 'Paste your API key here',
        helpLink: 'https://dev.elsevier.com/apikey/manage',
        field: 'token_scopus',
        required: false
    },
    {
        id: 'ieee',
        title: 'IEEE Xplore',
        icon: '⚡',
        description: 'Access technical literature in engineering and technology.',
        inputLabel: 'IEEE API Key',
        placeholder: 'Paste your API key here',
        helpLink: 'https://developer.ieee.org/apps/mykeys',
        field: 'token_ieee',
        required: false
    },
    {
        id: 'zai',
        title: 'Z.ai Integration',
        icon: '🧠',
        description: 'Enhance your research with AI-powered analysis tools.',
        inputLabel: 'Z.ai API Token',
        placeholder: 'Paste your API token here',
        helpLink: 'https://open.bigmodel.cn/usercenter/apikeys',
        field: 'token_z',
        required: false
    }
];
