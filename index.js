#!/usr/bin/env node

import inquirer from 'inquirer';
import figlet from 'figlet';
import chalk from 'chalk';
import gradient from 'gradient-string';
import fs from 'fs'


const categorie = ["FFPM", "FIHIRANA FANAMPINY", "ANTEMA"]

//TimeOut 2s
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
const log = console.log;

async function welcome() {
    console.clear();
    figlet(`FIHIRANA CLI`, (err, data) => {
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
    await sleep()
    await _search(_numero, _fileToUse)

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



async function _search(numero, path) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            log("An error has occurred")
            return
        } else {
            const jsonData = JSON.parse(data)
            const resultat = jsonData[numero].hira

            const number_verse = resultat.length

            for (let i = 0; i < number_verse; i++) {

                //Check if the part is not a verse
                var title = (resultat[i].fiverenany == false) ? chalk.green(`Andininy ${resultat[i].andininy} `) : chalk.yellow(`Fiv:`);

                //Header
                log(title)

                //Content
                log(resultat[i].tononkira, "\n")

            }
        }
    })
}




async function main() {
    //  console.clear();
    await welcome();

}

//main();
main()