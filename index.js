const fs = require('fs');
const inquirer = require('inquirer');

// Function to generate license badge URL
function generateLicenseBadge(license) {
    // Define badge URLs for common licenses
    const licenseBadges = {
        "MIT": "https://img.shields.io/badge/License-MIT-yellow.svg",
        "Apache 2.0": "https://img.shields.io/badge/License-Apache%202.0-blue.svg",
        // Add more licenses and their badge URLs as needed
    };

    // If the selected license has a predefined badge URL, return it
    if (licenseBadges[license]) {
        return licenseBadges[license];
    } else {
        // If the license is not in the predefined list, return a generic badge URL
        return "https://img.shields.io/badge/License-None-lightgrey.svg";
    }
}

// Questions for the user
const questions = [
    {
        type: 'input',
        message: 'What is the title of your project?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'What is the description of your project?',
        name: 'description',
    },
    {
        type: 'input',
        message: 'What are the installation instructions for your project?',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'What is the usage information for your project?',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'What are the contribution guidelines for your project?',
        name: 'contribution',
    },
    {
        type: 'input',
        message: 'What are the test instructions for your project?',
        name: 'test',
    },
    {
        type: 'list',
        message: 'What license does your project have?',
        name: 'license',
        choices: ['MIT', 'Apache 2.0', 'None'] // Add more licenses as needed
    },
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'username',
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is your name?',
        name: 'name',
    },
    {
        type: 'checkbox',
        message: 'What is your location',
        name: 'locations',
        choices: ['Chicago', 'New York', 'Sayner', 'Seattle'] 
    }
]; // <--- Closing curly brace added here

// Prompt the user with the questions
inquirer.prompt(questions)
  .then((answers) => {
    // Generate license badge URL
    const licenseBadgeURL = generateLicenseBadge(answers.license);

    // Generate README content using the user's responses
    const readmeContent = `
# ${answers.title}

![License](${licenseBadgeURL})

## Description
${answers.description}

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contribution](#contribution)
4. [Tests](#tests)
5. [License](#license)
6. [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contribution
${answers.contribution}

## Tests
${answers.test}

## License
This project is licensed under the ${answers.license} license. ${
    answers.license !== 'None' ? 'See [LICENSE](LICENSE) file for details.' : ''
}

## Walkthrough Video
[Watch the walkthrough video](${answers.videoLink})

## Questions
For questions or inquiries, please contact:
- [${answers.name}](https://github.com/${answers.username}) on GitHub
- Email: ${answers.email}
`;

    // Write README file
    fs.writeFile('generateREADME.md', readmeContent, (err) => {
      if (err) {
        console.error('Error occurred while writing README file:', err);
      } else {
        console.log('README file generated successfully!');
      }
    });
})
.catch((error) => {
    console.error('Error occurred:', error);
});

