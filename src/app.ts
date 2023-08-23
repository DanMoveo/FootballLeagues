import './styles.scss';


const leagueButtonsContainer = document.getElementById('leagueButtons') as HTMLDivElement;

interface League {
  strLeague: string;
  strSport: string;
}

async function fetchLeagues(): Promise<League[]> {
  try {
    const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
    const data = await response.json();
    const leagues: League[] = data.leagues;
    const americanFootballLeagues: League[] = leagues.filter(league => league.strSport === "American Football");
    return americanFootballLeagues;  } catch (error) {
    console.error('Error fetching leagues:', error);
    return [];
  }
}
async function createLeagueButtons() {
  const leagues: League[] = await fetchLeagues();
  const selectedLeagues = leagues.slice(0, 5);

  let activeButton: HTMLButtonElement | null = null; // To store the currently active button

  selectedLeagues.forEach((league: League) => {
    const button = document.createElement('button');
    button.className = 'tab';
    button.setAttribute('data-league', league.strLeague);
    button.textContent = league.strLeague;

    button.addEventListener('click', () => {
      const leagueName = button.getAttribute('data-league');
      if (leagueName) {
        fetchTeamsForLeague(leagueName);

        // Remove active class from the previously active button
        if (activeButton) {
          activeButton.classList.remove('active');
        }

        // Add active class to the clicked button
        button.classList.add('active');
        activeButton = button; // Update the currently active button
      }
    });

    leagueButtonsContainer?.appendChild(button);
  });
}


createLeagueButtons();

const teamsContainer = document.querySelector('.teams-container') as HTMLDivElement;

interface Team {
  strTeam: string;
  strTeamBadge: string;
}

async function fetchTeamsForLeague(league: string) {
  console.log('Fetching teams for league:', league);

  const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${encodeURIComponent(league)}`);
  const data = await response.json();

  if (data.teams) {
    const teams: Team[] = data.teams;

    teamsContainer.innerHTML = '';

    teams.forEach((team: Team) => {
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
