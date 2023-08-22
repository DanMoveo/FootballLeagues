const leagueButtonsContainer = document.getElementById('leagueButtons');

async function fetchLeagues(): Promise<any[]> {
  try {
    const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
    const data = await response.json();
    const filteredLeagues = data.leagues.filter((league: any) => league.strSport === "American Football");
    return filteredLeagues;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    return [];
  }
}

async function createLeagueButtons() {
  const leagues = await fetchLeagues();
  const selectedLeagues = leagues.slice(0, 5);

  selectedLeagues.forEach((league: any) => {
    const button = document.createElement('button');
    button.className = 'tab';
    button.setAttribute('data-league', league.strLeague);
    button.textContent = league.strLeague;
    console.log(league.strLeague);

    button.addEventListener('click', () => {
      const leagueName = button.getAttribute('data-league');
      if (leagueName) {
        fetchTeamsForLeague(leagueName);
      }
    });

    leagueButtonsContainer?.appendChild(button);
  });
}

createLeagueButtons();

const teamsContainer = document.querySelector('.teams-container');

async function fetchTeamsForLeague(league: string) {
  console.log('Fetching teams for league:', league);

  const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${encodeURIComponent(league)}`);
  const data = await response.json();

  if (data.teams) {
    const teams = data.teams;

    teamsContainer.innerHTML = '';

    teams.forEach((team: any) => {
      const teamElement = document.createElement('div');
      teamElement.className = 'team';

      const teamLogo = document.createElement('img');
      teamLogo.className = 'team-logo';
      teamLogo.src = team.strTeamBadge;

      const teamName = document.createElement('p');
      teamName.textContent = team.strTeam;

      teamElement.appendChild(teamLogo);
      teamElement.appendChild(teamName);

      teamsContainer.appendChild(teamElement);
    });
  } else {
    console.log('No teams found for this league.');
  }
}
