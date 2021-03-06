import * as h from 'mithril/hyperscript'
import { getBoardBounds } from '../helper'
import Board from '../shared/Board'
import {
  renderAntagonist,
  renderGameActionsBar,
  renderReplay,
  renderInlineReplay
} from '../shared/offlineRound/view'
import { view as renderPromotion } from '../shared/offlineRound/promotion'
import { hasSpaceForReplay, hasSpaceForInlineReplay } from '../shared/round/util'
import * as helper from '../helper'
import actions from './actions'
import newGameMenu from './newAiGame'
import AiRound from './AiRound'

export function renderContent(ctrl: AiRound) {

  const material = ctrl.chessground.getMaterialDiff()
  const isPortrait = helper.isPortrait()
  const vd = helper.viewportDim()
  const bounds = getBoardBounds(helper.viewportDim(), isPortrait)

  const aiName = (
    <h2>
      {ctrl.getOpponent().name}
      { ctrl.vm.engineSearching ?
        <span className="engineSpinner fa fa-hourglass-half" /> :
        null
      }
    </h2>
  )

  const board = h(Board, {
    variant: ctrl.data.game.variant.key,
    chessground: ctrl.chessground,
    bounds
  })

  const orientationKey = isPortrait ? 'o-portrait' : 'o-landscape'

  if (isPortrait) {
    return h.fragment({ key: orientationKey }, [
      hasSpaceForReplay(vd, bounds) ? renderReplay(ctrl) :
        hasSpaceForInlineReplay(vd, bounds) ? renderInlineReplay(ctrl) : null,
      h('div.round-boardWrapper', [
        renderAntagonist(ctrl, aiName, material[ctrl.data.opponent.color], 'opponent', isPortrait, vd, bounds),
        board,
        renderAntagonist(ctrl, ctrl.playerName(), material[ctrl.data.player.color], 'player', isPortrait, vd, bounds),
      ]),
      renderGameActionsBar(ctrl)
    ])
  } else {
    return h.fragment({ key: orientationKey }, [
      board,
      <section key="table" className="table">
        <section className="playersTable offline">
          {renderAntagonist(ctrl, aiName, material[ctrl.data.opponent.color], 'opponent', isPortrait, vd, bounds)}
          {renderReplay(ctrl)}
          {renderAntagonist(ctrl, ctrl.playerName(), material[ctrl.data.player.color], 'player', isPortrait, vd, bounds)}
        </section>
        {renderGameActionsBar(ctrl)}
      </section>
    ])
  }
}

export function overlay(ctrl: AiRound) {
  return [
    actions.view(ctrl.actions),
    newGameMenu.view(ctrl.newGameMenu),
    renderPromotion(ctrl)
  ]
}

