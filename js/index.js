// your code here
function getRepositories() {
    const name = document.getElementById('username').value;
    const link = 'https://api.github.com' + '/users/' + name + '/repos';
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', link);
    req.send();
  }

  function displayRepositories() {
    const repos = JSON.parse(this.responseText);
    const repoList =
      '<ul>' +
      repos
        .map(repo => {
          const dataUsername = 'data-username="' + repo.owner.login + '"';
          const dataname = 'data-repository="' + repo.name + '"';
          return `
            <li>
              <h2>${repo.name}</h2>
              <a href="${repo.html_url}">${repo.html_url}</a><br>
              <a href="#" ${dataname} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
              <a href="#" ${dataname} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
            </li>`;
        })
        .join('') +
      '</ul>';
    document.getElementById('repositories').innerHTML = repoList;
  }

  function getCommits(el) {
    const name = el.dataset.repository;
    const link = 'https://api.github.com' + '/repos/' + el.dataset.username + '/' + name + '/commits';
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', link);
    req.send();
  }

  function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
          '<li><h3>' +
          commit.commit.author.name +
          ' (' +
          commit.author.login +
          ')</h3>' +
          commit.commit.message +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }

  function getBranches(el) {
    const name = el.dataset.repository;
    const link = 'https://api.github.com' + '/repos/' + el.dataset.username + '/' + name + '/branches';
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', link);
    req.send();
  }
  function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches
      .map(branch => '<li>' + branch.name + '</li>')
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
  }