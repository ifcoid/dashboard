# dashboard
Main Dashboard Dengan konsep Task Oriented UI

akses url:
https://if.co.id/dashboard



## Task-1 Melengkapi token user dulu

Pertama lakukan dulu pengecekan dari profile user apakah terdapat token yang sudah diisi atau belum, jika belum maka lakukan langkah berikut:
1. Token Github : ambil dari https://github.com/settings/tokens/new , centang repo dan admin:ssh_signing_key
2. Token Pubmed : ambil dari https://account.ncbi.nlm.nih.gov/settings/
3. Token Scopus : ambil dari https://dev.elsevier.com/apikey/manage
4. Token IEEE : ambil dari https://developer.ieee.org/apps/mykeys
5. Token Zai : ambil dari https://z.ai/manage-apikey/apikey-list

struct user:
	TokenGithub    string             `json:"-" bson:"token_github,omitempty"`    // GitHub API token
	TokenZ         string             `json:"-" bson:"token_z,omitempty"`         // Z service token
	TokenScopus    string             `json:"-" bson:"token_scopus,omitempty"`    // Scopus API token
	TokenIEEE      string             `json:"-" bson:"token_ieee,omitempty"`      // IEEE API token
	TokenPubmed    string             `json:"-" bson:"token_pubmed,omitempty"`    // PubMed API token