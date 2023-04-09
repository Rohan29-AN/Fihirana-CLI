#!/usr/bin/env node

import inquirer from 'inquirer';
import figlet from 'figlet';
import chalk from 'chalk';
import gradient from 'gradient-string';


const categorie = ["FFPM", "FIHIRANA FANAMPINY", "ANTEMA"]
const title = "FIHIRANAKO"

//TimeOut 2s
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const log = console.log;

async function welcome() {
    console.clear();
    figlet(`NY FIHIRANAKO`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');
    });


    await sleep();

    log("\n Tongasoa eto @ Ny Fihiranako")

    const question = await inquirer.prompt({
        name: 'user_choice',
        message: "Inona ny sokajy tianao ho jerana ?",
        choices: categorie,
        type: 'list'
    })

    let _userChoice = question.user_choice

    if (_userChoice === 'FFPM') {
        log("ffpm")
    } else if (_userChoice === 'FIHIRANA FANAMPINY') {

    } else {

    }

    log("User choice", question.user_choice)
}


async function main() {
    //  console.clear();
    await welcome();

}

//main();
main()