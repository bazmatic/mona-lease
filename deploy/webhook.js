
/*

Webhook to react to push event for particular branch of this repo
v1 is going to be fully hard coded while I figure out webhooks
can make this a generic component later



OK - after some testing, the webhook (when correctly configured for application/json
 (NB: this will just fall over if you use the default encoding in the github webhook)
 (if configured for something other than a push, then I'm not sure of the behanviour) )
is like this :

{ ref: 'refs/heads/live-instance-codecave',
  before: '9098c3c3cc2cc9760425e5dd2210c082f08a4978',
  after: '1e8571e1c414ff54ac46a96e8463226a6bf59314',
  created: false,
  deleted: false,
  forced: false,
  base_ref: null,
  compare: 'https://github.com/bazmatic/mona-lease/compare/9098c3c3cc2c...1e8571e1c414',
  commits: 
   [ { id: '1e8571e1c414ff54ac46a96e8463226a6bf59314',
       tree_id: '8e87b82b525e5ee9af9b7f8b249f0d63577bfa36',
       distinct: true,
       message: 'further test of webhook ...\n(have now changed it to send application/json ! :)',
       timestamp: '2018-03-01T15:57:42+10:00',
       url: 'https://github.com/bazmatic/mona-lease/commit/1e8571e1c414ff54ac46a96e8463226a6bf59314',
       author: [Object],
       committer: [Object],
       added: [],
       removed: [],
       modified: [Object] } ],
  head_commit: 
   { id: '1e8571e1c414ff54ac46a96e8463226a6bf59314',
     tree_id: '8e87b82b525e5ee9af9b7f8b249f0d63577bfa36',
     distinct: true,
     message: 'further test of webhook ...\n(have now changed it to send application/json ! :)',
     timestamp: '2018-03-01T15:57:42+10:00',
     url: 'https://github.com/bazmatic/mona-lease/commit/1e8571e1c414ff54ac46a96e8463226a6bf59314',
     author: 
      { name: 'krisrandall',
        email: 'kris.randall@gmail.com',
        username: 'krisrandall' },
     committer: 
      { name: 'krisrandall',
        email: 'kris.randall@gmail.com',
        username: 'krisrandall' },
     added: [],
     removed: [],
     modified: [ 'deploy/webhook.js' ] },
  repository: 
   { id: 104434129,
     name: 'mona-lease',
     full_name: 'bazmatic/mona-lease',
     owner: 
      { name: 'bazmatic',
        email: 'barry@earsman.com',
        login: 'bazmatic',
        id: 1154619,
        avatar_url: 'https://avatars2.githubusercontent.com/u/1154619?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/bazmatic',
        html_url: 'https://github.com/bazmatic',
        followers_url: 'https://api.github.com/users/bazmatic/followers',
        following_url: 'https://api.github.com/users/bazmatic/following{/other_user}',
        gists_url: 'https://api.github.com/users/bazmatic/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/bazmatic/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/bazmatic/subscriptions',
        organizations_url: 'https://api.github.com/users/bazmatic/orgs',
        repos_url: 'https://api.github.com/users/bazmatic/repos',
        events_url: 'https://api.github.com/users/bazmatic/events{/privacy}',
        received_events_url: 'https://api.github.com/users/bazmatic/received_events',
        type: 'User',
        site_admin: false },
     private: false,
     html_url: 'https://github.com/bazmatic/mona-lease',
     description: 'Manage the rent of a shared resource via an Ethereum smart contract.',
     fork: false,
     url: 'https://github.com/bazmatic/mona-lease',
     forks_url: 'https://api.github.com/repos/bazmatic/mona-lease/forks',
     keys_url: 'https://api.github.com/repos/bazmatic/mona-lease/keys{/key_id}',
     collaborators_url: 'https://api.github.com/repos/bazmatic/mona-lease/collaborators{/collaborator}',
     teams_url: 'https://api.github.com/repos/bazmatic/mona-lease/teams',
     hooks_url: 'https://api.github.com/repos/bazmatic/mona-lease/hooks',
     issue_events_url: 'https://api.github.com/repos/bazmatic/mona-lease/issues/events{/number}',
     events_url: 'https://api.github.com/repos/bazmatic/mona-lease/events',
     assignees_url: 'https://api.github.com/repos/bazmatic/mona-lease/assignees{/user}',
     branches_url: 'https://api.github.com/repos/bazmatic/mona-lease/branches{/branch}',
     tags_url: 'https://api.github.com/repos/bazmatic/mona-lease/tags',
     blobs_url: 'https://api.github.com/repos/bazmatic/mona-lease/git/blobs{/sha}',
     git_tags_url: 'https://api.github.com/repos/bazmatic/mona-lease/git/tags{/sha}',
     git_refs_url: 'https://api.github.com/repos/bazmatic/mona-lease/git/refs{/sha}',
     trees_url: 'https://api.github.com/repos/bazmatic/mona-lease/git/trees{/sha}',
     statuses_url: 'https://api.github.com/repos/bazmatic/mona-lease/statuses/{sha}',
     languages_url: 'https://api.github.com/repos/bazmatic/mona-lease/languages',
     stargazers_url: 'https://api.github.com/repos/bazmatic/mona-lease/stargazers',
     contributors_url: 'https://api.github.com/repos/bazmatic/mona-lease/contributors',
     subscribers_url: 'https://api.github.com/repos/bazmatic/mona-lease/subscribers',
     subscription_url: 'https://api.github.com/repos/bazmatic/mona-lease/subscription',
     commits_url: 'https://api.github.com/repos/bazmatic/mona-lease/commits{/sha}',
     git_commits_url: 'https://api.github.com/repos/bazmatic/mona-lease/git/commits{/sha}',
     comments_url: 'https://api.github.com/repos/bazmatic/mona-lease/comments{/number}',
     issue_comment_url: 'https://api.github.com/repos/bazmatic/mona-lease/issues/comments{/number}',
     contents_url: 'https://api.github.com/repos/bazmatic/mona-lease/contents/{+path}',
     compare_url: 'https://api.github.com/repos/bazmatic/mona-lease/compare/{base}...{head}',
     merges_url: 'https://api.github.com/repos/bazmatic/mona-lease/merges',
     archive_url: 'https://api.github.com/repos/bazmatic/mona-lease/{archive_format}{/ref}',
     downloads_url: 'https://api.github.com/repos/bazmatic/mona-lease/downloads',
     issues_url: 'https://api.github.com/repos/bazmatic/mona-lease/issues{/number}',
     pulls_url: 'https://api.github.com/repos/bazmatic/mona-lease/pulls{/number}',
     milestones_url: 'https://api.github.com/repos/bazmatic/mona-lease/milestones{/number}',
     notifications_url: 'https://api.github.com/repos/bazmatic/mona-lease/notifications{?since,all,participating}',
     labels_url: 'https://api.github.com/repos/bazmatic/mona-lease/labels{/name}',
     releases_url: 'https://api.github.com/repos/bazmatic/mona-lease/releases{/id}',
     deployments_url: 'https://api.github.com/repos/bazmatic/mona-lease/deployments',
     created_at: 1506057188,
     updated_at: '2018-01-31T07:18:47Z',
     pushed_at: 1519883891,
     git_url: 'git://github.com/bazmatic/mona-lease.git',
     ssh_url: 'git@github.com:bazmatic/mona-lease.git',
     clone_url: 'https://github.com/bazmatic/mona-lease.git',
     svn_url: 'https://github.com/bazmatic/mona-lease',
     homepage: null,
     size: 19663,
     stargazers_count: 1,
     watchers_count: 1,
     language: 'JavaScript',
     has_issues: true,
     has_projects: true,
     has_downloads: true,
     has_wiki: true,
     has_pages: false,
     forks_count: 0,
     mirror_url: null,
     archived: false,
     open_issues_count: 0,
     license: null,
     forks: 0,
     open_issues: 0,
     watchers: 1,
     default_branch: 'master',
     stargazers: 1,
     master_branch: 'master' },
  pusher: { name: 'krisrandall', email: 'kris.randall@gmail.com' },
  sender: 
   { login: 'krisrandall',
     id: 1888888,
     avatar_url: 'https://avatars1.githubusercontent.com/u/1888888?v=4',
     gravatar_id: '',
     url: 'https://api.github.com/users/krisrandall',
     html_url: 'https://github.com/krisrandall',
     followers_url: 'https://api.github.com/users/krisrandall/followers',
     following_url: 'https://api.github.com/users/krisrandall/following{/other_user}',
     gists_url: 'https://api.github.com/users/krisrandall/gists{/gist_id}',
     starred_url: 'https://api.github.com/users/krisrandall/starred{/owner}{/repo}',
     subscriptions_url: 'https://api.github.com/users/krisrandall/subscriptions',
     organizations_url: 'https://api.github.com/users/krisrandall/orgs',
     repos_url: 'https://api.github.com/users/krisrandall/repos',
     events_url: 'https://api.github.com/users/krisrandall/events{/privacy}',
     received_events_url: 'https://api.github.com/users/krisrandall/received_events',
     type: 'User',
     site_admin: false } }

*/


const http          = require('http')
const url           = require('url')
const child_process = require('child_process')


// -------------------------------------------------------------------
// CONFIG PARAMS :
let   PORT = 4552
const branch_prefix   = 'refs/heads/'
let   branch_to_watch = 'live-instance-codecave'
const script_to_run   = '/projects/mona-lease/deploy/live-deploy.sh'
// -------------------------------------------------------------------


function process_push(data) {

    const ref_match = `${branch_prefix}${branch_to_watch}`

    //console.log(data)
    console.log(' ---- ', data.ref, ' ---- ', ref_match)
    
    if ( data.ref != ref_match ) {
        console.log(`Not the ${branch_to_watch}, so skipping`)
    } else {
        const cmd = `${script_to_run} ${branch_to_watch}`
        child_process.exec('ls -lah /tmp', function(error, stdout, stderr) {
            console.log('-------------------------------------------')
            console.log(`Running script (${scmd})`)
            console.log('Error:', error)
            console.log('Stdout:', stdout)
            console.log('Stderr:', stderr)
            console.log('-------------------------------------------')
        })
    }
}


const server = http.createServer(function(req, res) {
    // Parse the params - prints "{ abcd: 'efgh' }"
    var URLParams = url.parse(req.url, true).query;
    console.log(URLParams);

    // How do I access the JSON payload as an object?
    var body = [];
    req.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();
        if (body) {
            console.log('Recieved !') //, JSON.parse(body))
            process_push(JSON.parse(body))
        }
        res.end('It Works!!');
    });
}).listen(PORT)

