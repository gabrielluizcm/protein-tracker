type State = {
  open: boolean
}

type Action = {
  type: 'toggle' | 'open' | 'close'
}

export function modalReducer(state: State, action: Action) {
  switch (action.type) {
    case 'open':
      return { open: true };
    case 'close':
      return { open: false };
    case 'toggle':
      return { open: !state.open };
  }
}