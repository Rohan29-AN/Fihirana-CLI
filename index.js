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

    log("\n Tongasoa eto @ Ny Fihiranako \n")

    const question = await inquirer.prompt({
        name: 'user_choice',
        message: "Inona ny sokajy tianao ho jerana ?",
        choices: categorie,
        type: 'list'
    })

    let _userChoice = question.user_choice

    let _fileToUse = '';

    if (_userChoice === 'FFPM') {
        _fileToUse = 'assets/01_fihirana_ffpm.json'
        log("ffpm")
    } else if (_userChoice === 'FIHIRANA FANAMPINY') {
        _fileToUse = 'assets/02_fihirana_fanampiny.json'

    } else {
        _fileToUse = 'assets/03_antema.json'
    }

    const _numero = await _lyricsId()
    log("Hira ho jerena", _numero)

}


async function _lyricsId() {
    const _num = await inquirer.prompt({
        name: 'numero',
        message: '\nLaharana hira ho tadiavina : ',
        type: 'input',
        default () {
            return null
        }
    })
    return _num.numero
}


async function main() {
    //  console.clear();
    await welcome();

}

//main();
main()