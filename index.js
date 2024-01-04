#!/usr/bin/env node

import inquirer from 'inquirer';
import figlet from 'figlet';
import chalk from 'chalk';
import gradient from 'gradient-string';
import fs from 'fs'
import { createSpinner } from 'nanospinner';
import { resolve } from 'path';
import { rejects } from 'assert';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);


const categorie = ["FFPM", "FIHIRANA FANAMPINY", "ANTEMA"]


const page_max = {
    "FFPM": 827,
    "FIHIRANA FANAMPINY": 54,
    "ANTEMA": 24
}




//TimeOut 2s
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const log = console.log;

async function welcome() {
    console.clear();
    figlet(`FIHIRANA -CLI`, (err, data) => {
        console.log(gradient.retro.multiline(data) + '\n');
    });


    await sleep();

    const question = await inquirer.prompt({
        name: 'user_choice',
        message: "Inona ny sokajy tianao ho jerana ?",
        choices: categorie,
        type: 'list'
    })

    let _userChoice = question.user_choice

    let _fileToUse = '';

    let _prefix = '';


    const __filename = fileURLToPath(
        import.meta.url);
    const __dirname = path.dirname(__filename);

    //path that contains the Assets folder
    let path_origine = __dirname + "/assets"

    if (_userChoice === 'FFPM') {
        _fileToUse = path.resolve(process.cwd(), path_origine, '01_fihirana_ffpm.json');
        _prefix = 'ffpm_'

    } else if (_userChoice === 'FIHIRANA FANAMPINY') {
        _fileToUse = path.resolve(process.cwd(), path_origine, '02_fihirana_fanampiny.json');
        _prefix = 'ff_'

    } else {
        _fileToUse = path.resolve(process.cwd(), path_origine, '03_antema.json');
        _prefix = 'antema_'
    }

    const _numero = await _lyricsId(page_max[_userChoice])

    await _search(_prefix, _numero, _fileToUse)

}


async function _lyricsId(max) {
    const _num = await inquirer.prompt({
        name: 'numero',
        message: `\nLaharana hira ho tadiavina  (1 hatramin'ny ${max}): `,
        type: 'input',
        default: null,
        validate: (input) => {
            const num = parseInt(input)
                //Check if the input isn't a number
            if (!Number.isInteger(num)) {
                return "Hamarino ny laharana ampidirinao azafady"
            } else if (num < 1 || num > max) {
                return "Tsy misy hira mifanaraka @ laharana nampidirinao"
            } else {
                return true
            }
        }
    })
    return _num.numero
}

async function drawTheScreen() {
    console.clear();
    await welcome();
}

async function _closeTerminal() {
    const _response = await inquirer.prompt({
        name: "response",
        message: "Hitady hira hafa",
        type: 'confirm',

    })
    if (_response.response == true) {

        drawTheScreen()
    } else {
        log("Misaotra anao nampiasa ny Fihirana CLI")
        process.exit(0)
    }
}



async function _search(_prefix, numero, path) {
    try {
        const data = await new Promise((resolve, reject) => {
            fs.readFile(path, 'utf-8', async(err, data) => {
                if (err) {
                    reject(data)
                } else {
                    resolve(data)
                }
            })
        });
        const _key = _prefix + numero
        const jsonData = JSON.parse(data)
        const resultat = jsonData[_key].hira

        const number_verse = resultat.length

        //Loader
        const spinner = createSpinner('Miandrasa kely vetivety\n').start()

        setTimeout(() => {
            spinner.success()
        }, 1500)

        await sleep();

        spinner.clear()

        for (let i = 0; i < number_verse; i++) {

            //Check if the part is not a verse
            var title = (resultat[i].fiverenany == false) ? chalk.green(`Andininy ${resultat[i].andininy} `) : chalk.yellow(`Fiv:`);

            //Header
            log(title)

            //Content
            log(resultat[i].tononkira, "\n")

        }

        _closeTerminal()


    } catch (e) {
        log("An error has occured", e)
    }

}



async function main() {
    drawTheScreen()

}

//main();
main()