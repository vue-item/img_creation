import * as type from './mutations-types'

export const stateChange = ({ commit }, name) => {
  commit(type.STATECHANGE, name)
}
