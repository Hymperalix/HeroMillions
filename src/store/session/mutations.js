export const update = (state, update) => {
  Object.assign(state, update)
}

export const clear = (state) => {
  Object.keys(state).forEach(key => {
    state[key] = undefined
  })
}
