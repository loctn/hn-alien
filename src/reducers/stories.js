const initialState = {
  new: [],
  top: [],
  best: [],
  ask: [],
  show: [],
  job: []
};

const stories = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_STORIES':
    return Object.assign({}, state, {
      [action.storyType]: [...state[action.storyType], ...action.stories]
    });
  default:
    return state;
  }
};


export default stories;