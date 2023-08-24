import './styles.scss';
const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const leagueButtonsContainer = document.getElementById('leagueButtons') as HTMLDivElement;
const teamsContainer = document.querySelector('.teams-container') as HTMLDivElement;

interface League {
  strLeague: string;
  strSport: string;
}

interface Team {
  strTeam: string;
  strTeamBadge: string;
}

// utility function for fetching data
async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Fetch leagues by sport
async function fetchLeagues(sport: string): Promise<League[]> {
  const url = `${API_BASE_URL}/all_leagues.php`;
  const data = await fetchData<{ leagues: League[] }>(url);
  if (!data) {
    throw new Error('Failed to fetch leagues');
  }
  return data.leagues.filter(league => league.strSport === sport);
}

// Fetch teams for a league
async function fetchTeamsForLeague(league: string): Promise<Team[]> {
  const url = `${API_BASE_URL}/search_all_teams.php?l=${encodeURIComponent(league)}`;
  const data = await fetchData<{ teams: Team[] }>(url);
  if (!data) {
    throw new Error('Failed to fetch teams');
  }
  return data.teams;
}

// Display teams on the page
function displayTeams(teams: Team[]) {
  const teamsContainer = document.querySelector('.teams-container') as HTMLDivElement;
  teamsContainer.innerHTML = '';

  teams.forEach(team => {
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
}

// Activate the clicked button and deactivate the previously active button
function activateButton(button: HTMLButtonElement) {
  const activeButton = document.querySelector('.tab.active') as HTMLButtonElement;
  if (activeButton) {
    activeButton.classList.remove('active');
  }
  button.classList.add('active');
}

// Create league buttons and set up event listeners
async function createLeagueButtons() {
  try {
    const leagues = await fetchLeagues("American Football");
    const selectedLeagues = leagues.slice(0, 5);

    const leagueButtonsContainer = document.getElementById('leagueButtons') as HTMLDivElement;
    selectedLeagues.forEach(league => {
      const button = document.createElement('button');
      button.className = 'tab';
      button.setAttribute('data-league', league.strLeague);
      button.textContent = league.strLeague;

      button.addEventListener('click', async () => {
        const leagueName = button.getAttribute('data-league');
        if (leagueName) {
          try {
            const teams = await fetchTeamsForLeague(leagueName);
            displayTeams(teams);
            activateButton(button);
          } catch (error) {
            console.error('Error fetching teams:', error);
          }
        }
      });

      leagueButtonsContainer.appendChild(button);
    });
  } catch (error) {
    console.error('Error fetching leagues:', error);
  }
}

// Initialize the application
createLeagueButtons();