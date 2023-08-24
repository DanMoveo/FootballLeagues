import './styles.scss';
const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const leagueButtonsContainer : HTMLElement = document.getElementById('leagueButtons');
const teamsContainer : HTMLDivElement = document.querySelector('.teams-container');

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
    const response : Response = await fetch(url);
    const data : any = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Fetch leagues by sport
async function fetchLeagues(sport: string): Promise<League[]> {
  const url : string = `${API_BASE_URL}/all_leagues.php`;
  const data : {leagues : League[]}= await fetchData<{ leagues: League[] }>(url);
  if (!data) {
    throw new Error('Failed to fetch leagues');
  }
  return data.leagues.filter(league => league.strSport === sport);
}

// Fetch teams for a league
async function fetchTeamsForLeague(league: string): Promise<Team[]> {
  const url : string = `${API_BASE_URL}/search_all_teams.php?l=${encodeURIComponent(league)}`;
  const data : {teams : Team[]} = await fetchData<{ teams: Team[] }>(url);
  if (!data) {
    throw new Error('Failed to fetch teams');
  }
  return data.teams;
}

// Display teams on the page
function displayTeams(teams: Team[]) : void {
  teamsContainer.innerHTML = '';

  teams.forEach(team => {
    const teamElement : HTMLDivElement= document.createElement('div');
    teamElement.className = 'team';

    const teamLogo : HTMLImageElement = document.createElement('img');
    teamLogo.className = 'team-logo';
    teamLogo.src = team.strTeamBadge;

    const teamName : HTMLParagraphElement = document.createElement('p');
    teamName.textContent = team.strTeam;

    teamElement.appendChild(teamLogo);
    teamElement.appendChild(teamName);

    teamsContainer.appendChild(teamElement);
  });
}

// Create league buttons and set up event listeners
async function createLeagueButtons() : Promise<void> {
  try {
    const leagues : League[] = await fetchLeagues("American Football");
    const selectedLeagues : League[] = leagues.slice(0, 5);

    selectedLeagues.forEach(league => {
      const button : HTMLButtonElement = document.createElement('button');
      button.className = 'tab';
      button.setAttribute('data-league', league.strLeague);
      button.textContent = league.strLeague;

      button.addEventListener('click', async () => {
        const leagueName : string | null = button.getAttribute('data-league');
        if (leagueName) {
          try {
            const teams : Team[] = await fetchTeamsForLeague(leagueName);
            displayTeams(teams);
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