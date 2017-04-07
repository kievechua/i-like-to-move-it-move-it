import { Module } from 'magnet-core/module'
import * as moveIt from './index'

export default class MagnetMoveIt extends Module {
  get moduleName () { return 'i_like_to_move_it_move_it' }
  get defaultConfig () { return __dirname }

  async setup () {
    moveIt(this.config)
  }
}
