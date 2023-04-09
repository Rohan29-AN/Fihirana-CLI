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

    log("\n \nTongasoa eto @ Ny Fihiranako")

    const question = await inquirer.prompt({
        name: 'user_choice',
        message: "Safidio ny sokajy tianao ho tadiavina",
        choices: categorie,
        type: 'list'
    })

    let User_Choice = question.user_choice


    log("User choice", question.user_choice)
}


async function main() {
    //  console.clear();
    await welcome();

}

//main();
main()