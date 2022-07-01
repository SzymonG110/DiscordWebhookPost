import IndexWeb from './express/index.web'
import {config as dotenvConfig} from 'dotenv'

dotenvConfig()

export class App {
    constructor() {

        new IndexWeb()

    }
}

new App()