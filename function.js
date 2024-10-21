// // Characters data
// const characters = [
//     { "name": "Gol D. Roger", "bounty": "5,000,000,000", "minScore": 500 },
//     { "name": "Edward Newgate (Whitebeard)", "bounty": "4,600,000,000", "minScore": 490 },
//     { "name": "Silvers Rayleigh", "bounty": "2,500,000,000", "minScore": 480 },
//     { "name": "Monkey D. Dragon", "bounty": "4,000,000,000", "minScore": 470 },
//     { "name": "Shanks", "bounty": "4,000,000,000", "minScore": 460 },
//     { "name": "Monkey D. Luffy", "bounty": "1,500,000,000", "minScore": 400 },
//     { "name": "Kaido", "bounty": "4,600,000,000", "minScore": 390 },
//     { "name": "Marshall D. Teach (Blackbeard)", "bounty": "2,247,600,000", "minScore": 380 },
//     { "name": "Big Mom", "bounty": "4,388,000,000", "minScore": 370 },
//     { "name": "Dracule Mihawk", "bounty": "1,000,000,000", "minScore": 360 },
//     { "name": "Trafalgar D. Water Law", "bounty": "1,500,000,000", "minScore": 400 },
//     { "name": "Eustass Kid", "bounty": "1,000,000,000", "minScore": 390 },
//     { "name": "Crocodile", "bounty": "100,000,000", "minScore": 380 },
//     { "name": "Yamato", "bounty": "1,000,000,000", "minScore": 370 },
//     { "name": "Sabo", "bounty": "602,000,000", "minScore": 360 },
//     { "name": "Donquixote Doflamingo", "bounty": "340,000,000", "minScore": 350 },
//     { "name": "Roronoa Zoro", "bounty": "60,000,000", "minScore": 340 },
//     { "name": "Sanji", "bounty": "330,000,000", "minScore": 330 },
//     { "name": "Marco", "bounty": "1,000,000,000", "minScore": 320 },
//     { "name": "Boa Hancock", "bounty": "80,000,000", "minScore": 310 },
//     { "name": "Ben Beckman", "bounty": "100,000,000", "minScore": 300 },
//     { "name": "Jinbe", "bounty": "500,000,000", "minScore": 290 },
//     { "name": "Katakuri", "bounty": "1,057,000,000", "minScore": 280 },
//     { "name": "Brook", "bounty": "383,000,000", "minScore": 270 },
//     { "name": "X Drake", "bounty": "222,222,222", "minScore": 260 },
//     { "name": "King", "bounty": "1,390,000,000", "minScore": 250 },
//     { "name": "Yamato", "bounty": "1,000,000,000", "minScore": 240 },
//     { "name": "Jewelry Bonney", "bounty": "200,000,000", "minScore": 230 },
//     { "name": "Franky", "bounty": "94,000,000", "minScore": 220 },
//     { "name": "Nico Robin", "bounty": "130,000,000", "minScore": 210 },
//     { "name": "Nami", "bounty": "66,000,000", "minScore": 200 },
//     { "name": "Tony Tony Chopper", "bounty": "100", "minScore": 190 },
//     { "name": "Coby", "bounty": "150,000,000", "minScore": 180 },
//     { "name": "Bepo", "bounty": "100", "minScore": 170 },
//     { "name": "Usopp", "bounty": "200,000,000", "minScore": 160 },
//     { "name": "Gaimon", "bounty": "100", "minScore": 150 },
//     { "name": "Trebol", "bounty": "100", "minScore": 140 },
//     { "name": "Buggy", "bounty": "15,000,000", "minScore": 130 }
// ];

// // Function to submit username
// function submitUsername() {
//     const username = document.getElementById('github-username').value.trim();
//     if (username) {
//         CalculateBounty();
//     }
// }

// // Main calculation function
// async function CalculateBounty() {
//     const username = document.getElementById('github-username').value.trim();
//     const loading = document.getElementById('loading');
//     const error = document.getElementById('error');
//     const result = document.getElementById('result');

//     if (!username) {
//         error.textContent = 'Please enter your Github username';
//         error.style.display = 'block';
//         return;
//     }

//     loading.style.display = 'block';
//     error.style.display = 'none';
//     result.style.display = 'none';

//     try {
//         // Fetch user data
//         const userResponse = await fetch(`https://api.github.com/users/${username}`);
//         if (!userResponse.ok) throw new Error('User not found');
//         const userData = await userResponse.json();

//         // Fetch repositories
//         const reposResponse = await fetch(userData.repos_url);
//         if (!reposResponse.ok) throw new Error('Could not fetch repositories');
//         const repos = await reposResponse.json();

//         // Calculate total stars
//         let totalStars = 0;
//         repos.forEach(repo => {
//             totalStars += repo.stargazers_count;
//         });

//         // Calculate approximated metrics
//         const totalCommits = repos.length * 50;  // Approximate
//         const totalPullRequests = repos.length * 2;  // Approximate
//         const totalIssues = repos.length * 3;  // Approximate

//         // Calculate the total score
//         const score = (
//             (userData.public_repos * 10) +
//             (totalCommits * 5) +
//             (totalPullRequests * 15) +
//             (totalIssues * 5) +
//             (userData.followers * 5) +
//             (totalStars * 10)
//         );

//         const matchedCharacter = characters.find(char => score >= char.minScore) || characters[characters.length - 1];

//         // Display results
//         result.querySelector('.character-name').textContent = `Character: ${matchedCharacter.name}`;
//         result.querySelector('.bounty-amount').textContent = `Bounty: ₿${matchedCharacter.bounty}`;
//         result.querySelector('.score').textContent = `Score: ${score.toFixed(2)}`;
//         result.querySelector('.repos').textContent = `Repositories: ${userData.public_repos}`;
//         result.querySelector('.followers').textContent = `Followers: ${userData.followers}`;
//         result.querySelector('.stars').textContent = `Total Stars: ${totalStars}`;

//         result.style.display = 'block';

//     } catch (error) {
//         error.textContent = 'Error: Could not find GitHub user or rate limit exceeded';
//         error.style.display = 'block';
//     } finally {
//         loading.style.display = 'none';
//     }
// }