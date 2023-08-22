/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function() {

eval("var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst leagueButtonsContainer = document.getElementById('leagueButtons');\nfunction fetchLeagues() {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const response = yield fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');\n            const data = yield response.json();\n            const filteredLeagues = data.leagues.filter((league) => league.strSport === \"American Football\");\n            return filteredLeagues;\n        }\n        catch (error) {\n            console.error('Error fetching leagues:', error);\n            return [];\n        }\n    });\n}\nfunction createLeagueButtons() {\n    return __awaiter(this, void 0, void 0, function* () {\n        const leagues = yield fetchLeagues();\n        const selectedLeagues = leagues.slice(0, 5);\n        selectedLeagues.forEach((league) => {\n            const button = document.createElement('button');\n            button.className = 'tab';\n            button.setAttribute('data-league', league.strLeague);\n            button.textContent = league.strLeague;\n            console.log(league.strLeague);\n            button.addEventListener('click', () => {\n                const leagueName = button.getAttribute('data-league');\n                if (leagueName) {\n                    fetchTeamsForLeague(leagueName);\n                }\n            });\n            leagueButtonsContainer === null || leagueButtonsContainer === void 0 ? void 0 : leagueButtonsContainer.appendChild(button);\n        });\n    });\n}\ncreateLeagueButtons();\nconst teamsContainer = document.querySelector('.teams-container');\nfunction fetchTeamsForLeague(league) {\n    return __awaiter(this, void 0, void 0, function* () {\n        console.log('Fetching teams for league:', league);\n        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${encodeURIComponent(league)}`);\n        const data = yield response.json();\n        if (data.teams) {\n            const teams = data.teams;\n            teamsContainer.innerHTML = '';\n            teams.forEach((team) => {\n                const teamElement = document.createElement('div');\n                teamElement.className = 'team';\n                const teamLogo = document.createElement('img');\n                teamLogo.className = 'team-logo';\n                teamLogo.src = team.strTeamBadge;\n                const teamName = document.createElement('p');\n                teamName.textContent = team.strTeam;\n                teamElement.appendChild(teamLogo);\n                teamElement.appendChild(teamName);\n                teamsContainer.appendChild(teamElement);\n            });\n        }\n        else {\n            console.log('No teams found for this league.');\n        }\n    });\n}\n\n\n//# sourceURL=webpack://my_project/./src/app.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.ts"]();
/******/ 	
/******/ })()
;